console.log("I am in server.js");
// Importing modules
var mongoose = require('mongoose');
var express = require('express');
var bodyParser = require('body-parser');

// Intialize express app
var app = express();

// Mongodb connection url
var MONGODB_URI = "mongodb://localhost:27017/hashAppDb";

// Connect to MongoDB
mongoose.connect(MONGODB_URI);

mongoose.connection.on('connected', () =>{
	console.log("connected to Mongodb @ 27017");
});

// Using bodyparser to parse json data
app.use(bodyParser.json());

// Importing routes
console.log("Importing routes");
const user = require("./route/user");

// Use user route when url matches /api/user/
console.log("Use user route when url matches /api/user/");
app.use('/api/user', user);

//creating server
const port = 8080;
app.listen(port, ()=>{
	console.log("server is runing at port: " + port);
});