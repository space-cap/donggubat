const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8080;
const PUBLIC_DIR = path.join(__dirname);
const OUTPUT_DIR = path.resolve(__dirname, '../../docs/team/images/output');

// 출력 폴더 생성 확인
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml'
};

const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/save-slide') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const payload = JSON.parse(body);
        const { num, imgData } = payload;
        
        // base64 prefix 제거
        const base64Data = imgData.replace(/^data:image\/png;base64,/, "");
        const filePath = path.join(OUTPUT_DIR, `slide_${num}.png`);
        
        fs.writeFileSync(filePath, base64Data, 'base64');
        console.log(`[SAVED] Slide ${num} saved to ${filePath}`);
        
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, path: filePath }));
      } catch (err) {
        console.error('[ERROR] Failed to save slide image:', err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: err.message }));
      }
    });
    return;
  }

  // GET 정적 파일 서빙
  if (req.method === 'GET') {
    let urlPath = req.url.split('?')[0];
    if (urlPath === '/') urlPath = '/index.html';
    
    const filePath = path.join(PUBLIC_DIR, decodeURIComponent(urlPath));
    const ext = path.extname(filePath);
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    
    fs.readFile(filePath, (err, content) => {
      if (err) {
        if (err.code === 'ENOENT') {
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.end('404 Not Found');
        } else {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
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
  console.log(`[SERVER] Cardnews server running at http://localhost:${PORT}`);
  console.log(`[SERVER] Outputs will be saved to: ${OUTPUT_DIR}`);
});
