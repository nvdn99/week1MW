const fs = require('fs');
const http = require('http');
const path = require('path');

const port = 3001;
const dataFilePath = path.join(__dirname, 'users.json');

const server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/api/users') {
        fs.readFile(dataFilePath, 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading data file:', err);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Internal Server Error' }));
                return;
            }
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(data);
        });
    } else if (req.method === 'POST' && req.url === '/api/users') {
        let requestBody = '';

        req.on('data', (chunk) => {
            requestBody += chunk;
        });

        req.on('end', () => {
            try {
                const newUser = JSON.parse(requestBody);

                fs.readFile(dataFilePath, 'utf8', (err, data) => {
                    if (err) {
                        console.error('Error reading data file:', err);
                        res.writeHead(500, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ error: 'Internal Server Error' }));
                        return;
                    }

                    const users = JSON.parse(data);
                    newUser.id = users.length + 1;

                    users.push(newUser);
                    fs.writeFile(dataFilePath, JSON.stringify(users, null, 2), 'utf8', (err) => {
                        if (err) {
                            console.error('Error writing data file:', err);
                            res.writeHead(500, { 'Content-Type': 'application/json' });
                            res.end(JSON.stringify({ error: 'Internal Server Error' }));
                            return;
                        }

                        res.writeHead(201, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify(newUser));
                    });
                });
            } catch (error) {
                console.error('Error parsing request body:', error);
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Bad Request' }));
            }
        });
    } else {
 
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Not Found' }));
    }
});

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
