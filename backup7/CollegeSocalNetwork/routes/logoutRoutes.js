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
module.exports = router;