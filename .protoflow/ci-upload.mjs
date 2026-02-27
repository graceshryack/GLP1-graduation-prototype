import { readFileSync, writeFileSync, existsSync, readdirSync } from 'fs';
import { join, basename } from 'path';
import https from 'https';

const API = 'https://protoflow-app.netlify.app';
const TIMEOUT_MS = 120000;

function findSnapshots() {
  const results = {};
  const dirs = ['.protoflow-screens'];

  for (const dir of dirs) {
    if (!existsSync(dir)) continue;
    for (const entry of readdirSync(dir)) {
      if (!entry.endsWith('.png')) continue;
      const id = basename(entry, '.png');
      results[id] = join(dir, entry);
    }
  }

  return results;
}

function post(path, body) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(body);
    console.log(`  Payload size: ${(Buffer.byteLength(data) / 1024 / 1024).toFixed(1)}MB`);
    const url = new URL(API + path);
    const req = https.request({
      hostname: url.hostname,
      path: url.pathname,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data),
      },
      timeout: TIMEOUT_MS,
    }, (res) => {
      let chunks = '';
      res.on('data', (c) => chunks += c);
      res.on('end', () => {
        console.log(`  Response status: ${res.statusCode}`);
        if (res.statusCode >= 400) {
          reject(new Error(`HTTP ${res.statusCode}: ${chunks.slice(0, 200)}`));
          return;
        }
        try { resolve(JSON.parse(chunks)); }
        catch { resolve({ raw: chunks }); }
      });
    });
    req.on('timeout', () => { req.destroy(); reject(new Error('Request timed out after ' + (TIMEOUT_MS/1000) + 's')); });
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

async function uploadBatch(manifest, allSnapshots, screenSubset, batchLabel) {
  const screens = screenSubset.map(s => {
    const screenshotPath = allSnapshots[s.id];
    const result = { ...s };
    if (screenshotPath) {
      const b64 = readFileSync(screenshotPath).toString('base64');
      result.screenshotBase64 = 'data:image/png;base64,' + b64;
    }
    return result;
  });

  const payload = {
    projectName: manifest.projectName,
    screens,
    flows: manifest.flows,
  };

  console.log(`\n${batchLabel}: Uploading ${screens.length} screens...`);
  const result = await post('/api/generations/upload', {
    projectName: manifest.projectName,
    figmaPayload: payload,
  });

  return result;
}

async function main() {
  console.log('ProtoFlow CI Upload');
  console.log('===================\n');

  if (!existsSync('protoflow-manifest.json')) {
    console.error('ERROR: protoflow-manifest.json not found.');
    process.exit(1);
  }

  const manifest = JSON.parse(readFileSync('protoflow-manifest.json', 'utf-8'));
  console.log('Project:', manifest.projectName);
  console.log('Screens:', manifest.screens.length);
  console.log('Flows:', manifest.flows.length);

  const allSnapshots = findSnapshots();
  const matched = manifest.screens.filter(s => allSnapshots[s.id]);
  console.log('\nScreenshots found:', Object.keys(allSnapshots).length);
  console.log('Matched to manifest:', matched.length);
  matched.forEach(s => console.log('  ✓', s.id));

  let result;

  try {
    result = await uploadBatch(manifest, allSnapshots, manifest.screens, 'Full upload');
  } catch (err) {
    console.log(`\nFull upload failed: ${err.message}`);
    console.log('Trying batched upload (2 halves)...\n');

    const mid = Math.ceil(manifest.screens.length / 2);
    const batch1 = manifest.screens.slice(0, mid);
    const batch2 = manifest.screens.slice(mid);

    try {
      result = await uploadBatch(manifest, allSnapshots, batch1, 'Batch 1');
      const genId1 = result.generationId || result.id || 'unknown';
      console.log('  Batch 1 Generation ID:', genId1);

      const result2 = await uploadBatch(manifest, allSnapshots, batch2, 'Batch 2');
      const genId2 = result2.generationId || result2.id || 'unknown';
      console.log('  Batch 2 Generation ID:', genId2);

      result = { batch1: genId1, batch2: genId2, generationId: genId1 };
    } catch (batchErr) {
      console.error('Batched upload also failed:', batchErr.message);
      writeFileSync('.protoflow-payload-manifest.json', JSON.stringify({
        projectName: manifest.projectName,
        screensWithScreenshots: matched.length,
        flows: manifest.flows.length,
      }, null, 2));
      console.log('\nScreenshots are available as GitHub Actions artifact.');
      console.log('Download them from the Actions tab on your repository.');
      process.exit(0);
    }
  }

  const genId = result.generationId || result.id || 'unknown';
  console.log('\n✓ Upload complete!');
  console.log('  Generation ID:', genId);
  if (result.figmaPluginUrl) console.log('  Figma Plugin URL:', result.figmaPluginUrl);
  if (result.viewUrl) console.log('  View URL:', result.viewUrl);

  writeFileSync('.protoflow/last-generation.json', JSON.stringify(result, null, 2));
  console.log('\nSaved to .protoflow/last-generation.json');
}

main().catch(err => {
  console.error('Fatal error:', err.message);
  process.exit(1);
});
