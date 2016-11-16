var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var User = new Schema({
	name : {
		required : true,
		type: String
	},
	email : {
		required : true,
		type: String,
		unique : true
	},
	mobile : {
		required : true,
		type: String,
		unique :true
	},
	password : {
		type: String,
		default : '12345'
	},
	contacts : [ {type: mongoose.Schema.Types.ObjectId, ref: 'User'}] 
});


var Users = mongoose.model('User',User);

module.exports = Users;

