#!/usr/bin/env node
const path = require('path');
const { spawn } = require('child_process');

const invokedAs = path.basename(process.argv[1] || '');
if (invokedAs === 'badforge' || invokedAs === 'badforge.cmd') {
  console.warn('[DEPRECATED] "badforge" has been renamed to "forgewhip".');
  console.warn('Please run: npm install -g forgewhip');
}

let electronBinary;
try {
  electronBinary = require('electron');
} catch (e) {
  console.error('Could not load Electron. Try: npm install -g forgewhip');
  process.exit(1);
}

const appPath = path.resolve(__dirname, '..');

const child = spawn(electronBinary, [appPath], {
  detached: true,
  stdio: 'ignore',
  windowsHide: true,
});

child.on('error', (err) => {
  console.error('Failed to start forgewhip:', err.message);
  process.exit(1);
});

child.unref();
