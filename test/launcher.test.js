const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');
const path = require('node:path');
const test = require('node:test');

test('Linux launcher explains when no graphical session is available', () => {
  const launcher = path.join(__dirname, '..', 'bin', 'badforge.js');
  const env = { ...process.env };
  delete env.DISPLAY;
  delete env.WAYLAND_DISPLAY;

  const result = spawnSync(process.execPath, [launcher], {
    env,
    encoding: 'utf8',
  });

  assert.equal(result.status, 1);
  assert.match(result.stderr, /graphical desktop session/i);
  assert.match(result.stderr, /DISPLAY|WAYLAND_DISPLAY/);
});
