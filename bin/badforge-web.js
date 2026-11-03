#!/usr/bin/env node
const { createBadForgeWebServer } = require('../lib/web-server');

const host = process.env.BADFORGE_WEB_HOST || '127.0.0.1';
const port = Number.parseInt(process.env.BADFORGE_WEB_PORT || '8765', 10);
const server = createBadForgeWebServer();

server.listen(port, host, () => {
  console.log(`BadForge web whip listening at http://${host}:${port}/`);
});

for (const signal of ['SIGINT', 'SIGTERM']) {
  process.on(signal, () => server.close(() => process.exit(0)));
}
