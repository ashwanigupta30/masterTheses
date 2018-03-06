//include all the required dependencies
const url = require('url');
var express = require('express');
var router = express.Router();

//include all the required models
var Users = require('../models/Users/');
var UserDetails = require('../models/UserDetails/');
router.get("/",function(req, res) {
    res.render('userDetailsRegistraion');
});

router.post("/",function(req, res) {
	console.log("req.body");
	console.log(req.body);

	console.log("prepared data for insertion");
	var data = {
		"_id" 		: req.body.objectId,
		"userName"	: req.body.userName,
		"firstName" : req.body.firstName,
		"lastName"	: req.body.lastName,
		"dateOfBirth" 	: req.body.dateOfBirth,
		"friendList"	:[],
		"posts"			:[]
	};
	console.log(data);

	var thisUser = new UserDetails(data);
	thisUser.save(function(err,doc){
		if(err){
			console.log('error in storing data');
			console.log(err);
		}
		else{
			console.log("doc after storing");
			console.log(doc);
			res.redirect(url.format({
			       pathname:"/profile",
			       query: {
			          "id": doc._id,
			          "userName": doc.userName
			        }
			     }));
		}
	});
});

module.exports = router;