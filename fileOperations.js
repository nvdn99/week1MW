const fs = require('fs');

// Creates a text file with the intent of producing a simple hello word text response 
fs.writeFile('example.txt', 'Hello, World!', 'utf8', (err) => {
    if (err) {
        console.error('Error creating the file:', err);
        return;
    }
    console.log('File created successfully.');

    // Reads the previous file/ line of code, thus producing the hello world text 
    fs.readFile('example.txt', 'utf8', (readErr, data) => {
        if (readErr) {
            console.error('Error reading the file:', readErr);
            return;
        }
        console.log('File content:', data);

        // Deletes the previous hello world text file 
        fs.unlink('example.txt', (deleteErr) => {
            if (deleteErr) {
                console.error('Error deleting the file:', deleteErr);
                return;
            }
            console.log('File deleted successfully.');
        });
    });
});
