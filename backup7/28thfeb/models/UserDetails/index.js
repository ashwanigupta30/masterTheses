const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userDetailsSchema = new Schema({
	_id 		:String,
	userName	:String,
	// email		:String,
	// password	:String,
	firstName 	:String,
	lastName	:String,
	dateOfBirth	:String,
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