//include all the required dependencies
const url = require('url');
var express = require('express');
var router = express.Router();

//include all the required models
var Users = require('../models/Users/');
var UserDetails = require('../models/UserDetails/');

//service to check if the userExistsOrNot
router.post("/",function(req,res){
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
});

module.exports = router;