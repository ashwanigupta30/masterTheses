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

app.get("/",function(req,res){
	res.sendfile('index.html',{root: './public'});
});

app.post("/registerUser",function(req,res){
	res.send("registerUserHit");
})

app.post("/userLogin",function(req,res){
	var findQuery = {
		userName : req.body.userName,
		password : req.body.password
	}
	Users.find(req.body,function(err,doc){
		if(err){
			console.log("Error in fetcing User Details");
			res.send("Error in fetcing User Details");
		}
		else{
			res.send(doc);
		}
	})
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