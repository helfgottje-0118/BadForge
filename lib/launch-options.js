function isWhipSpawnRequested(argv = process.argv) {
  return argv.includes('--spawn');
}

module.exports = { isWhipSpawnRequested };
