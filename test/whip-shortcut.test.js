const assert = require('node:assert/strict');
const test = require('node:test');

const { createWhipShortcut } = require('../lib/whip-shortcut');

test('W triggers a crack only while the whip shortcut is active', () => {
  let registeredKey;
  let handler;
  let cracks = 0;
  const globalShortcut = {
    register(key, callback) {
      registeredKey = key;
      handler = callback;
      return true;
    },
    unregister(key) {
      assert.equal(key, 'W');
      handler = undefined;
    },
  };
  const shortcut = createWhipShortcut(globalShortcut, () => { cracks += 1; });

  assert.equal(shortcut.activate(), true);
  assert.equal(registeredKey, 'W');
  handler();
  assert.equal(cracks, 1);

  shortcut.deactivate();
  assert.equal(handler, undefined);
  assert.equal(shortcut.isActive(), false);
});
