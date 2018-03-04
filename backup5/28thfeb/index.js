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
		console.log("Connected To MongoDB database");
	}
});

//include the Models that are required
const Users = require('./models/Users/');


//all the middleware
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

//custom middle ware to print the request method and route for each request
app.use(function(req,res,next){
	console.log(req.method +" "+ req.path);
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


//root route to render view
app.get("/login",function(req,res){
	res.render('login');
});

//route to render registration view
app.get("/registration",function(req,res){

	res.render('registration');
});

//service to check if the userExistsOrNot
app.get("/validateNewUser",function(req,res){
	var data = {
		'name' : 'ashwani'
	};
	res.send(data);
})

//route to register users
app.post("/registration",function(req,res){
	data = {
		'email' 	:req.body.email,
		'userName'	:req.body.userName,
		'password'	:req.body.password
	}
	console.log(data);
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

//app to authenticate user
app.post("/login",function(req,res){
	console.log(req.body);
	data = {
		'userName'	:req.body.userName,
		'password'	:req.body.password
	}
	Users.find(data,function(err,doc){
		if(err) console.log("error fetching data from Data base");
		else{
			console.log(doc);
			res.render('userProfile')
		}
	})
});

























//if none of the routes match throw a 404 error
app.use(function(req,res){
	res.render('404');
})


app.listen(port, function(err){
	if(err){
		return console.log("error in starting server");
	}
	console.log("Server Started in port : "+port);
});