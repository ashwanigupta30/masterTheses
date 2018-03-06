const http = require('http');
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require('path');
const port = 3000;

//create a database connection to Schema CollegeSocalNetwork
var dbPath = "mongodb://localhost/CollegeSocialNetwork";
mongoose.connect(dbPath,function(err,doc){
	if(err) console.log("Error Connecting to MongoDB");
	else{
		console.log("Connected To MongoDB database Server");
	}
});

//all the middleware
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

//custom middle ware to print the request method and route for each request
app.use(function(req,res,next){

	var method = req.method;
	var path = (req.path).toString();
	var ignorePaths = ["/css","/js","/img","/favicon"];
	var flag = true;
	for(var counter=0;counter<ignorePaths.length;counter++){
		if((path.startsWith(ignorePaths[counter]))){
			flag = false;
			break;
		}
	}
	if(flag){
		console.log(method +" "+ path);
	}
	next();
});

//set the view engine to ejs.
app.set('view engine', 'ejs');

//include all the css, js and img files from node modules and assets directory
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
app.use('/js', express.static(__dirname + '/node_modules/popper.js/dist'));//popper js
app.use('/js', express.static(__dirname + '/node_modules/toastr/build')); // toastr js library for display errors/warnings
app.use('/js', express.static(__dirname + '/assets/JS'));
app.use('/css', express.static(__dirname + '/node_modules/toastr/build')); // toastr js library for display errors/warnings
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap
app.use('/css', express.static(__dirname + '/assets/CSS'));
app.use('/img', express.static(__dirname + '/assets/img'));

//include all the routes
app.use("/login",require('./routes/loginRoutes'));
app.use("/registration",require('./routes/registrationRoutes'));
app.use("/userDetailsRegistraion",require('./routes/userDetailsRegistraionRoutes'))
app.use("/profile",require('./routes/profileRoutes'));

//include all the services
app.use("/validateNewUser",require('./services/validateNewUserService'));
app.use("/getUserDetails",require('./services/getUserDetailsService'));


// if none of the routes match throw a 404 error
app.use(function(req,res){
	res.render('404');
})

// start the server and listen on port 3000;
app.listen(port, function(err){
	if(err){
		return console.log("error in starting server");
	}
	console.log("Server Started in port : "+port);
});