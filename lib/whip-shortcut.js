function createWhipShortcut(globalShortcut, onCrack) {
  let active = false;

  return {
    activate() {
      if (active) return true;
      active = globalShortcut.register('W', onCrack);
      return active;
    },
    deactivate() {
      if (!active) return;
      globalShortcut.unregister('W');
      active = false;
    },
    isActive() {
      return active;
    },
  };
}

module.exports = { createWhipShortcut };
