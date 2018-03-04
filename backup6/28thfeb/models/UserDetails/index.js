const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userDetailsSchema = new Schema({
	userName	:String,
	// email		:String,
	// password	:String,
	firstName 	:String,
	lastName	:String,
	dob 		:Number,
	friendList	:[{
					userName	:String,
					friendType	:String,
				}],
	posts		:[{
					postId 		:Number,
					description	:String
				}]
});

module.exports = mongoose.model('UserDetails',userDetailsSchema);