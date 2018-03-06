const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema({
	userName	:String,
	email		:String,
	password	:String

});

module.exports = mongoose.model('Users',userSchema);