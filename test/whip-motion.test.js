const assert = require('node:assert/strict');
const test = require('node:test');

const { applyCrackImpulse } = require('../lib/whip-motion');

test('crack impulse snaps the tip harder than the handle', () => {
  const points = Array.from({ length: 6 }, (_, i) => ({ x: i * 10, y: 20, px: i * 10, py: 20 }));

  applyCrackImpulse(points, 30, 1);

  assert.equal(points[0].px, points[0].x);
  assert.equal(points[0].py, points[0].y);
  assert.ok(Math.abs(points[5].x - points[5].px) > Math.abs(points[2].x - points[2].px));
  assert.ok(points[5].py > points[5].y);
});
