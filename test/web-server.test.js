const assert = require('node:assert/strict');
const http = require('node:http');
const test = require('node:test');

const { createBadForgeWebServer } = require('../lib/web-server');

function request(port, path) {
  return new Promise((resolve, reject) => {
    http.get({ host: '127.0.0.1', port, path }, response => {
      let body = '';
      response.setEncoding('utf8');
      response.on('data', chunk => { body += chunk; });
      response.on('end', () => resolve({ status: response.statusCode, type: response.headers['content-type'], body }));
    }).on('error', reject);
  });
}

test('web server serves the mouse whip and crack audio', async t => {
  const server = createBadForgeWebServer();
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  t.after(() => server.close());
  const port = server.address().port;

  const page = await request(port, '/');
  assert.equal(page.status, 200);
  assert.match(page.body, /Move your mouse sharply to crack the whip/);
  assert.match(page.body, /sounds\/A\.mp3/);

  const sound = await request(port, '/sounds/A.mp3');
  assert.equal(sound.status, 200);
  assert.match(sound.type, /^audio\/mpeg/);

  const traversal = await request(port, '/../package.json');
  assert.equal(traversal.status, 404);
});
