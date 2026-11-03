const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
const ROUTES = new Map([
  ['/', ['overlay.html', 'text/html; charset=utf-8']],
  ['/overlay.html', ['overlay.html', 'text/html; charset=utf-8']],
  ['/lib/whip-motion.js', ['lib/whip-motion.js', 'text/javascript; charset=utf-8']],
  ['/sounds/A.mp3', ['sounds/A.mp3', 'audio/mpeg']],
  ['/sounds/B.mp3', ['sounds/B.mp3', 'audio/mpeg']],
  ['/sounds/C.mp3', ['sounds/C.mp3', 'audio/mpeg']],
  ['/sounds/D.mp3', ['sounds/D.mp3', 'audio/mpeg']],
  ['/sounds/E.mp3', ['sounds/E.mp3', 'audio/mpeg']],
]);

function createBadForgeWebServer() {
  return http.createServer((request, response) => {
    const pathname = new URL(request.url, 'http://localhost').pathname;
    const route = ROUTES.get(pathname);
    if (!route) {
      response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      response.end('Not found');
      return;
    }
    const [relative, type] = route;
    const file = path.join(ROOT, relative);
    response.writeHead(200, {
      'Content-Type': type,
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
    });
    fs.createReadStream(file).on('error', () => {
      if (!response.headersSent) response.writeHead(500);
      response.end();
    }).pipe(response);
  });
}

module.exports = { createBadForgeWebServer };
