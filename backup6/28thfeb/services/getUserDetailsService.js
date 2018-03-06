//include all the required dependencies
const url = require('url');
var express = require('express');
var router = express.Router();

//include all the required models
var Users = require('../models/Users/');
var UserDetails = require('../models/UserDetails/');

//service to retrive user details using object id and userName;
router.post("/",function(req,res){
	// console.log(req.body);
	var findQuery = {
		"_id"	:req.body.id,
		"userName"	:req.body.userName
	}

	UserDetails.findOne(findQuery,function(err,doc){
		if(err) console.log("error while searching new user");
		else{
			res.send(doc)
		}
	});
});

module.exports = router;