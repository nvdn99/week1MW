const fs = require('fs');
const http = require('http');
const url = require('url');

// File operations
function readCarFile(filePath, callback) {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      callback(err, null);
      return;
    }
    callback(null, data);
  });
}

function writeCarFile(filePath, content, callback) {
  fs.writeFile(filePath, content, (err) => {
    if (err) {
      callback(err);
      return;
    }
    callback(null);
  });
}

function deleteCarFile(filePath, callback) {
  fs.unlink(filePath, (err) => {
    if (err) {
      callback(err);
      return;
    }
    callback(null);
  });
}

// Sample car data
const sampleCars = [
  { model: 'Car Model 1', year: 2020, color: 'Red' },
  { model: 'Car Model 2', year: 2021, color: 'Blue' },
  { model: 'Car Model 3', year: 2019, color: 'Green' },
];

// Create an HTTP server
const server = http.createServer((req, res) => {
  const { pathname, query } = url.parse(req.url, true);

  if (req.method === 'GET' && pathname === '/') {
    // Serve an HTML page when accessing the root URL
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Car Management</title>
        </head>
        <body>
          <h1>Welcome to the Car Management System</h1>
          <p>This is a simple demonstration of a car management system.</p>
          <form action="/api/v1/cars" method="GET">
            <button type="submit">View Cars</button>
          </form>
        </body>
      </html>
    `;
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(htmlContent);
  } else if (req.method === 'GET' && pathname === '/api/v1/cars') {
    // Respond with sample car data as JSON
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(sampleCars));
  } else if (req.method === 'POST' && pathname === '/api/v1/cars') {
    // ... (the rest of your code for handling POST requests)
  } else if (req.method === 'DELETE' && pathname === '/api/v1/cars') {
    // ... (the rest of your code for handling DELETE requests)
  } else {
    // Handle invalid routes
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
