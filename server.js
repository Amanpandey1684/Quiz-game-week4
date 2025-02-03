const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const server = http.createServer((req, res) => {
    // Serve static files with correct MIME types
    if (req.url === '/' || req.url === '/index.html') {
        serveFile(res, 'public/index.html', 'text/html');
    } else if (req.url === '/style.css') {
        serveFile(res, 'public/style.css', 'text/css');
    } else if (req.url === '/script.js') {
        serveFile(res, 'public/script.js', 'application/javascript');
    } 
    // Serve quiz questions
    else if (req.url === '/questions') {
        serveQuestions(res);
    } else {
        res.writeHead(404);
        res.end('Not Found');
    }
});

function serveFile(res, filename, contentType) {
    const filePath = path.join(__dirname, filename);
    fs.readFile(filePath, (err, content) => {
        if (err) {
            res.writeHead(500);
            res.end('Error loading file');
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content);
        }
    });
}

function serveQuestions(res) {
    const questionsPath = path.join(__dirname, 'questions.json');
    fs.readFile(questionsPath, (err, content) => {
        if (err) {
            res.writeHead(500);
            res.end('Error loading questions');
        } else {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(content);
        }
    });
}

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});