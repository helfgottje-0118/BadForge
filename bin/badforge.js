#!/usr/bin/env node
const path = require('path');
const { spawn } = require('child_process');

const invokedAs = path.basename(process.argv[1] || '');
if (invokedAs === 'forgewhip' || invokedAs === 'forgewhip.cmd') {
  console.warn('[ALIAS] "forgewhip" launches BadForge.');
}

if (process.platform === 'linux' && !process.env.DISPLAY && !process.env.WAYLAND_DISPLAY) {
  console.error('BadForge requires a logged-in graphical desktop session.');
  console.error('No DISPLAY or WAYLAND_DISPLAY is available in this terminal.');
  console.error('Log in to the machine desktop, open a terminal there, and run: badforge');
  process.exit(1);
}

let electronBinary;
try {
  electronBinary = require('electron');
} catch (e) {
  console.error('Could not load Electron. Try: npm install -g github:helfgottje-0118/BadForge');
  process.exit(1);
}

const appPath = path.resolve(__dirname, '..');

const child = spawn(electronBinary, [appPath, ...process.argv.slice(2)], {
  detached: true,
  stdio: 'ignore',
  windowsHide: true,
});

child.on('error', (err) => {
  console.error('Failed to start badforge:', err.message);
  process.exit(1);
});

child.unref();
