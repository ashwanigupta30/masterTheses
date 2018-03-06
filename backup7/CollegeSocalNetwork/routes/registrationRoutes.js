//include all the required dependencies
const url = require('url');
var express = require('express');
var router = express.Router();

//include all the required models
var Users = require('../models/Users/');
var UserDetails = require('../models/UserDetails/');
router.get("/",function(req, res) {
    res.render('registration');
});

router.post("/",function(req, res) {
	data = {
			'email' 	:req.body.email,
			'userName'	:req.body.username,
			'password'	:req.body.password
		};
		console.log(data);
		var userData = new Users(data);
		userData.save(function(err,doc){
			if(err){
				console.log('error in storing data');
				console.log(err);
			}
			else{
				res.render('login');
			}
		});
});

module.exports = router;