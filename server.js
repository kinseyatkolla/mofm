import { createServer } from 'http';
import { readFileSync, existsSync, statSync } from 'fs';
import { join, extname } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = process.env.PORT || 80;
const DIST_DIR = join(__dirname, 'dist');

const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
};

function getMimeType(path) {
  const ext = extname(path);
  return MIME_TYPES[ext] || 'application/octet-stream';
}

function serveFile(filePath, res) {
  try {
    if (!existsSync(filePath) || !statSync(filePath).isFile()) {
      return false;
    }
    const content = readFileSync(filePath);
    const mimeType = getMimeType(filePath);
    res.writeHead(200, { 'Content-Type': mimeType });
    res.end(content);
    return true;
  } catch (error) {
    console.error('Error serving file:', error);
    return false;
  }
}

const server = createServer((req, res) => {
  let path = req.url.split('?')[0]; // Remove query string
  if (path === '/') {
    path = '/index.html';
  }

  const filePath = join(DIST_DIR, path);

  // Try to serve the requested file
  if (serveFile(filePath, res)) {
    return;
  }

  // If file doesn't exist and it's not a file request, try index.html (SPA routing)
  if (!extname(path)) {
    const indexPath = join(DIST_DIR, 'index.html');
    if (serveFile(indexPath, res)) {
      return;
    }
  }

  // 404
  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('Not Found');
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
