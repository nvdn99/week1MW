Hello World! Project 

This code simply creates a text file containing the common code phrase "Hello World!", the code then 
reads its content, and then finally deletes the file after its text is fully read.


This code sets up a web server that listens on port 3001. When it receives a web request, it checks if the request is to get a list of users or to add a new user. 

If it's a request to get users, it reads a file ("users.json") containing user data and sends it back as a response. 

If it's a request to add a user, it reads the request data, adds the user to the file, and sends back a success message. 

For any other requests or errors, it responds with appropriate error messages.