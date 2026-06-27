const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8085;
const PUBLIC_DIR = path.join(__dirname);

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp'
};

const server = http.createServer((req, res) => {
  if (req.method === 'GET') {
    let urlPath = req.url.split('?')[0];
    if (urlPath === '/') urlPath = '/index.html';
    
    const filePath = path.join(PUBLIC_DIR, decodeURIComponent(urlPath));
    const ext = path.extname(filePath);
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    
    fs.readFile(filePath, (err, content) => {
      if (err) {
        if (err.code === 'ENOENT') {
          res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
          res.end('404 Not Found - 파일이 존재하지 않습니다.');
        } else {
          res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
          res.end(`500 Internal Error: ${err.code}`);
        }
      } else {
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content, 'utf-8');
      }
    });
    return;
  }

  res.writeHead(405, { 'Content-Type': 'text/plain' });
  res.end('405 Method Not Allowed');
});

server.listen(PORT, () => {
  console.log(`[PRESENTATION SERVER] Running at http://localhost:${PORT}`);
  console.log(`[PRESENTATION SERVER] Root directory: ${PUBLIC_DIR}`);
});
