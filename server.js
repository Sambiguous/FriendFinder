// Import JS dependencies
var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");

// Import custom routing handlers
var html = require(path.join(__dirname, "./app/routing/htmlRouts.js"));
var api = require(path.join(__dirname, "./app/routing/apiRouts.js"));

// Initialize app 
var app = express();

// Designate port for server to listen on
var PORT = 3001;

// Set up bodyparser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Open static file directories so they can be served to clients
app.use(express.static(path.join(__dirname, "./app/public")));

// Initialize server routs
html(app);
api(app);


app.listen(PORT, function(){
    console.log("Server listening on port:", PORT);
});