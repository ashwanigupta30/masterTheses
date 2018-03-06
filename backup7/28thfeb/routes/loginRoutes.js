//include all the required dependencies
const url = require('url');
var express = require('express');
var router = express.Router();

//include all the required models
var Users = require('../models/Users/');
var UserDetails = require('../models/UserDetails/');
router.get("/",function(req, res) {
    res.render('login');
});

router.post("/",function(req, res) {
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
		
		// if user is found
		if(doc.length >= 1){
			console.log("user Schema");
			console.log(doc);

			var userObjectId = (doc[0]._id).toString();
			var userName =  (doc[0].userName).toString();
			obj_userDetailsSearchQuery = {'userName' : obj_userAutenticationSearchQuery.userName};

			// search of userDetails in other database
			UserDetails.find(obj_userDetailsSearchQuery,function(err,doc){
				
				if(err) console.log("error fetching userDetails");
				else if(doc.length == 1){
					res.redirect(url.format({
				       pathname:"/profile",
				       query: {
				          "id": doc[0]._id,
				          "userName": doc[0].userName
				        }
				     }));
				}
				else{
					// res.redirect('/userDetailsRegistraion');
					console.log(userObjectId);
					res.redirect(url.format({
					       pathname:"/userDetailsRegistraion",
					       query: {
					          "objectId": userObjectId,
					          "userName": userName
					        }
					     }));
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
module.exports = router;