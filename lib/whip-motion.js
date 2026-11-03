(function attachWhipMotion(root, factory) {
  const api = factory();
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  if (root) root.BadForgeMotion = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function buildWhipMotion() {
  function applyCrackImpulse(points, crackSpeed = 24, direction = 1) {
    if (!Array.isArray(points) || points.length < 2) return points;
    const sign = direction < 0 ? -1 : 1;
    for (let i = 1; i < points.length; i++) {
      const t = i / (points.length - 1);
      const snap = crackSpeed * (0.5 + 2.5 * t * t);
      points[i].px = points[i].x - sign * snap;
      points[i].py = points[i].y + crackSpeed * 0.8 * t;
    }
    return points;
  }

  return { applyCrackImpulse };
});
