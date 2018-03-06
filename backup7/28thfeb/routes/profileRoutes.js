//include all the required dependencies
const url = require('url');
var express = require('express');
var router = express.Router();

//include all the required models
var Users = require('../models/Users/');
var UserDetails = require('../models/UserDetails/');

//get route for profile page of each user
router.get("/",function(req, res) {
    res.render("profile");
});

module.exports = router;