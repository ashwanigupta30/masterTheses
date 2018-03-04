const http = require('http');
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require('path');
const port = 3000;

//include the userModel that was created
const Users = require('./models/Users/');

//create a database connection to Schema CollegeSocalNetwork
var dbPath = "mongodb://localhost/CollegeSocialNetwork";
mongoose.connect(dbPath,function(err,doc){
	if(err) console.log("Error Connecting to MongoDB");
	else{
		console.log("Connected To MongoDB database");
	}
});

//all the middleware
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
//app.use(bodyParser.multer()); // for parsing multipart/form-data
//app.use(express.static(path.join(__dirname,'public')));
//custom middle ware to print the request method and route for each request
app.use(function(req,res,next){
	console.log(req.method +" "+ req.path);
	next();
});

//include all the css and js files from node modules
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
app.use('/js', express.static(__dirname + '/node_modules/popper.js/dist'));//popper js
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap


//root route to render login/registration page
app.get("/",function(req,res){
	res.sendFile('index.html',{root: './public'});
});


//route to register users
app.post("/UserRegistraion",function(req,res){
	data = {
		'userName'	:req.body.userName,
		'password'	:req.body.password
	}
	var userData = new Users(data);
	userData.save(function(err,doc){
		if(err){
			console.log('error in storing data');
		}
		else{
			res.send('you are registered');
		}
	});
});






//if none of the routes match throw a 404 error
app.use(function(req,res){
	res.sendStatus(404).end();
})


app.listen(port, function(err){
	if(err){
		return console.log("error in starting server");
	}
	console.log("Server Started in port : "+port);
});