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
	}
});

var Users = mongoose.model('User',User);

module.exports = Users;

