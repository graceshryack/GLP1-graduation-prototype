import { readFileSync, writeFileSync, existsSync, readdirSync } from 'fs';
import { join, basename } from 'path';
import { execSync } from 'child_process';
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
    const url = new URL(API + path);
    const req = https.request({
      hostname: url.hostname,
      path: url.pathname,
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(data) },
    }, (res) => {
      let chunks = '';
      res.on('data', (c) => chunks += c);
      res.on('end', () => {
        if (res.statusCode >= 400) {
          reject(new Error('HTTP ' + res.statusCode + ': ' + chunks));
          return;
        }
        try { resolve(JSON.parse(chunks)); }
        catch { resolve(chunks); }
      });
    });
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

async function uploadScreenshot(screenId, imagePath, groupId) {
  const raw = readFileSync(imagePath);
  const b64 = raw.toString('base64');
  const sizeKB = Math.round(b64.length / 1024);
  console.log('  Uploading ' + screenId + ' (' + sizeKB + 'KB)...');

  const result = await post('/api/screenshots/upload', {
    screenId,
    imageBase64: b64,
    generationId: groupId,
  });

  if (result.screenshotUrl) {
    console.log('  ✓ ' + screenId + ' uploaded');
    return result.screenshotUrl;
  } else {
    console.warn('  ✗ ' + screenId + ' — upload failed:', result.error || result);
    return null;
  }
}

function notifySuccess(generationId, screenCount) {
  try { execSync('echo -n "' + generationId + '" | pbcopy'); } catch {}
  try {
    execSync("osascript -e 'display notification \"Generation ID copied to clipboard. Open Figma Desktop to continue.\" with title \"ProtoFlow\" subtitle \"" + screenCount + " screenshots uploaded\"'");
  } catch {}
  try {
    execSync('open "' + API + '/success?id=' + generationId + '&screens=' + screenCount + '"');
  } catch {}
}

async function main() {
  console.log('ProtoFlow CI Upload');
  console.log('===================\n');

  if (!existsSync('protoflow-manifest.json')) {
    console.error('ERROR: protoflow-manifest.json not found. Run the ProtoFlow initialize prompt first.');
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
    '.protoflow-screens',
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

  const foundCount = Object.keys(allSnapshots).length;
  console.log('\nTotal screenshot PNGs found: ' + foundCount);
  if (foundCount > 0) {
    console.log('IDs: ' + Object.keys(allSnapshots).join(', '));
  }

  if (foundCount === 0) {
    console.error('\n╔══════════════════════════════════════════════════════╗');
    console.error('║  ERROR: No screenshot PNG files found!                ║');
    console.error('╠══════════════════════════════════════════════════════╣');
    console.error('║  Screenshots must exist before uploading.             ║');
    console.error('║  Run snapshot tests first:                            ║');
    console.error('║  SNAPSHOT_TESTING_RECORD=all xcodebuild test ...      ║');
    console.error('║  Then re-run this script.                             ║');
    console.error('╚══════════════════════════════════════════════════════╝');
    console.error('\nSearched: ' + searchDirs.join(', '));
    console.error('Working dir: ' + process.cwd());
    process.exit(1);
  }

  console.log('\n── Matching to manifest ──');
  const matched = [];
  const unmatched = [];
  for (const screen of manifest.screens) {
    if (allSnapshots[screen.id]) { matched.push(screen.id); console.log('  ✓ ' + screen.id); }
    else { unmatched.push(screen.id); console.log('  ✗ ' + screen.id + ' — no matching PNG'); }
  }
  if (matched.length === 0) {
    console.error('\nERROR: PNGs found but none match manifest screen IDs.');
    console.error('Manifest IDs: ' + manifest.screens.map(function(s){return s.id}).join(', '));
    console.error('PNG IDs: ' + Object.keys(allSnapshots).join(', '));
    console.error('Aborting. Fix the ID mismatch first.');
    process.exit(1);
  }

  const groupId = manifest.projectName + '-' + Date.now();
  console.log('\n── Uploading ' + matched.length + ' screenshots ──\n');
  const urlMap = {};
  for (const screen of manifest.screens) {
    const screenshotPath = allSnapshots[screen.id];
    if (screenshotPath) {
      try {
        const url = await uploadScreenshot(screen.id, screenshotPath, groupId);
        if (url) urlMap[screen.id] = url;
      } catch (err) {
        console.warn('  ✗ ' + screen.id + ' — error: ' + err.message);
      }
    }
  }

  const uploadedCount = Object.keys(urlMap).length;
  console.log('\n' + uploadedCount + '/' + manifest.screens.length + ' screenshots uploaded');
  if (unmatched.length > 0) {
    console.log('Missing: ' + unmatched.join(', '));
  }

  const screens = manifest.screens.map(s => {
    const result = { ...s };
    if (urlMap[s.id]) {
      result.screenshotUrl = urlMap[s.id];
    }
    return result;
  });

  const payload = {
    projectName: manifest.projectName,
    screens,
    flows: manifest.flows,
  };

  console.log('Uploading payload to ProtoFlow API...');
  try {
    const result = await post('/api/generations/upload', {
      projectName: manifest.projectName,
      figmaPayload: payload,
    });

    writeFileSync('.protoflow/last-generation.json', JSON.stringify(result, null, 2));

    console.log('\n╔══════════════════════════════════════════════════════════════╗');
    console.log('║  ProtoFlow — Upload Complete!                                ║');
    console.log('╠══════════════════════════════════════════════════════════════╣');
    console.log('║                                                              ║');
    console.log('║  Generation ID: ' + result.generationId);
    console.log('║  (copied to clipboard)                                       ║');
    console.log('║                                                              ║');
    console.log('║  Web preview:                                                ║');
    console.log('║  ' + API + '/flow/' + result.generationId);
    console.log('║                                                              ║');
    console.log('║  Figma: Use Track A (auto via MCP) or Track B (plugin)       ║');
    console.log('║                                                              ║');
    console.log('╚══════════════════════════════════════════════════════════════╝');

    notifySuccess(result.generationId, uploadedCount);
  } catch (err) {
    console.error('Upload failed:', err.message);
    writeFileSync('.protoflow-payload.json', JSON.stringify(payload));
    console.log('Payload saved locally to .protoflow-payload.json (paste into Figma plugin manually)');
    process.exit(1);
  }
}

main();
