// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Dependencies */
const bodyParser = require('body-parser');
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 8000;

// Spin up the server
const server = app.listen(port, listening);

// Callback to debug
function listening(){
    console.log(server);
    console.log(`The server running on localhost: ${port}`);
};
// Initialize all route with a callback function
app.get('/all', sendData);
// Callback function to complete GET '/all'
function sendData (request, response) {
    response.send(projectData);
}
// Post Route
app.post('/add', callBack);
function callBack(req, res) {
    console.log(req.body);
    res.send(projectData);
    projectData["date"] = req.body.date;
    projectData["temp"] = req.body.temp;
    projectData["content"] = req.body.content;
}
