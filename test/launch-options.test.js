const assert = require('node:assert/strict');
const test = require('node:test');

const { isWhipSpawnRequested } = require('../lib/launch-options');

test('--spawn requests the whip overlay immediately', () => {
  assert.equal(isWhipSpawnRequested(['electron', '/app', '--spawn']), true);
});

test('normal launch stays in the tray', () => {
  assert.equal(isWhipSpawnRequested(['electron', '/app']), false);
});
