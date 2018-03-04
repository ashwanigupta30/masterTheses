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

//include the Models that are required
var Users = require('./models/Users/');
var UserDetails = require('./models/UserDetails/');


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


// get route to render login view
app.get("/login",function(req,res){
	res.render('login');
});

// post route to authenticate user
app.post("/login",function(req,res){
	// console.log(req.body);
	var obj_userAutenticationSearchQuery = {
		'userName'	:req.body.username,
		'password'	:req.body.password
	}
	
	// print the requested body on the console
	console.log("req.body")
	console.log(req.body);

	//print the prepared search query on the console
	console.log("obj_userAutenticationSearchQuery");
	console.log(obj_userAutenticationSearchQuery);

	// search the mongodb database for the user
	Users.find(obj_userAutenticationSearchQuery,function(err,doc){
		if(err) console.log("error fetching data from Data base");
		
		//if the any document is found
		if(doc.length >= 1){
			console.log(doc);
			obj_userDetailsSearchQuery = {'userName' : obj_userAutenticationSearchQuery.userName};
			UserDetails.findOne(obj_userDetailsSearchQuery,function(err,doc){
				
				if(err) console.log("error fetching userDetails");
				else if(doc.length >= 1){
					res.redirect('/profile?id='+doc[0]._id);
				}
				else{
					res.send(doc);
				}

			});
		}

		//if no documents are found
		else{
			console.log("login failed :rendering the login page again")
			res.render('login');
		}
	})
});

// get route to render registration view
app.get("/registration",function(req,res){
	res.render('registration');
});

// post route to register new users
app.post("/registration",function(req,res){
	data = {
		'email' 	:req.body.email,
		'userName'	:req.body.username,
		'password'	:req.body.password
	}
	console.log(data);
	var userData = new Users(data);
	userData.save(function(err,doc){
		if(err){
			console.log('error in storing data');
		}
		else{
			res.render('login');
		}
	});
});

app.get("/profile",function(req,res){
	res.render("profile");
});

//service to check if the userExistsOrNot
app.post("/validateNewUser",function(req,res){
	Users.find({ $or: [{'userName': req.body.username}, {'email': req.body.email}]},function(err,doc){
		if(err) console.log("error while searching new user");
		else{
			console.log(doc);
			if(doc.length > 0){
				res.send("taken");
			}
			else{
				res.send("not_taken");
			}
		}
	});
})

























// if none of the routes match throw a 404 error
app.use(function(req,res){
	res.render('404');
})

// start the server and listen on post 3000;
app.listen(port, function(err){
	if(err){
		return console.log("error in starting server");
	}
	console.log("Server Started in port : "+port);
});