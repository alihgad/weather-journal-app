// Setup empty JS object to act as endpoint for all routes
projectData = { };

// Require Express to run server and routes
const express = require('express')
const bodyParser = require('body-Parser')
const cors = require('cors');
const { Agent } = require('http');
const app = express()
const port = 3000
const server = app.listen(port,listening)
const apiKey = '6641be4658cdae05e1628444aba67ac8&units=imperial'

// Start up an instance of app

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
function listening(){
    console.log('welcome in your server');
    console.log(`server is runing on localhost:${port}`);
}
app.post('/weather', async function(req,res){
    const body = await req.body;
    projectData = body ; 
    console.log(projectData);
    res.status(200).send(projectData);
})