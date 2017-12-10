//import JS dependencies
var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");

//import custom routing handlers
var html = require("./app/routing/htmlRouts.js");
//var api = require("./data/routing/apiRouts.js");

// initialize app and set PORT variable
var app = express();
var PORT = 3000;

// Set up bodyparser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Initialize server routs
html(app);
//api(app);


app.listen(PORT, function(){
    console.log("Server listening on port:", PORT);
});