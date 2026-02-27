import { readFileSync, writeFileSync, existsSync, readdirSync } from 'fs';
import { join, basename } from 'path';
import https from 'https';

const API = 'https://protoflow-app.netlify.app';

function findSnapshots(dir) {
  const results = {};
  if (!existsSync(dir)) return results;
  const walk = (d) => {
    for (const entry of readdirSync(d, { withFileTypes: true })) {
      const full = join(d, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.name.endsWith('.png')) {
        const id = basename(entry.name, '.png')
          .replace(/^test_/, '')
          .replace(/\.1$/, '');
        results[id] = full;
      }
    }
  };
  walk(dir);
  return results;
}

function post(path, body) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(body);
    const req = https.request(API + path, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(data) },
    }, (res) => {
      let chunks = '';
      res.on('data', (c) => chunks += c);
      res.on('end', () => {
        try { resolve(JSON.parse(chunks)); }
        catch { resolve(chunks); }
      });
    });
    req.on('error', reject);
    req.write(data);
    req.end();
  });
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

  const searchDirs = [
    'Tests', 'ProtoFlowCaptureTests', '__Snapshots__',
    join('Tests', 'ProtoFlowCaptureTests', '__Snapshots__'),
    join('Tests', '__Snapshots__'),
    join('ios', 'App', 'Tests'),
  ];

  let allSnapshots = {};
  for (const dir of searchDirs) {
    const found = findSnapshots(dir);
    Object.assign(allSnapshots, found);
  }

  const rootSnapshots = findSnapshots('.');
  for (const [id, path] of Object.entries(rootSnapshots)) {
    if (!allSnapshots[id] && path.includes('__Snapshots__')) {
      allSnapshots[id] = path;
    }
  }

  console.log('\nScreenshots found:', Object.keys(allSnapshots).length);

  const screens = manifest.screens.map(s => {
    const screenshotPath = allSnapshots[s.id];
    const result = { ...s };
    if (screenshotPath) {
      const b64 = readFileSync(screenshotPath).toString('base64');
      result.screenshotBase64 = 'data:image/png;base64,' + b64;
      console.log('  ✓', s.id, '(' + Math.round(b64.length / 1024) + 'KB)');
    } else {
      console.log('  ✗', s.id, '— no screenshot found');
    }
    return result;
  });

  const payload = {
    projectName: manifest.projectName,
    screens,
    flows: manifest.flows,
  };

  console.log('\nUploading to ProtoFlow API...');
  try {
    const result = await post('/api/generations/upload', {
      projectName: manifest.projectName,
      figmaPayload: payload,
    });

    console.log('\n✓ Upload complete!');
    console.log('  Generation ID:', result.generationId);
    console.log('  Figma Plugin URL:', result.figmaPluginUrl);

    writeFileSync('.protoflow/last-generation.json', JSON.stringify(result, null, 2));
    console.log('\nSaved to .protoflow/last-generation.json');
  } catch (err) {
    console.error('Upload failed:', err.message);
    writeFileSync('.protoflow-payload.json', JSON.stringify(payload));
    console.log('Payload saved locally to .protoflow-payload.json');
    process.exit(1);
  }
}

main();
