var mongoose = require('mongoose');
var express = require('express');
var User =  require('../models/Users');
var verify=  require('./verify');

var router = express.Router();
var db = mongoose.connection;

router.post('/register',function(req,res,next){
	console.log(req);
	User.create(req.body,function(err,User){
		if(err){
			console.log(err);
			var err = new Error('imporoper json request');
			err.status = 422;
			console.log(err);			
			next(err);
			return;
		}

		res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end('user created' +res);

	});
});


router.post('/login',function(req,res,next){

	User.findOne({mobile:req.body.mobile,password:req.body.password},function(err,use){
		if(err){
			var err = new Error('User not found');
			err.status = 401;
			next(err);
			return ;
		}
		if(use==null){
			console.log(err);
			var err = new Error('imporoper json request');
			err.status = 422;
			console.log(err);			
			next(err);
			return;
		}
		//console.log(use._id);
		res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end(verify.getToken(use));
	});
});

//router.all(verify.verifyToken(req.body.token));

router.post('/updateContact',function(req,res,next){
	
	var currentUser = verify.verifyToken(req.body.token);
	var verified = [];
	var j=0;
	var contacts = [];
	console.log(req.body.contacts.length);
	
	User.find({ mobile: {$in:req.body.contacts}},function(err,user){
		    if(err){
		    	var err = new Error("improper request");
		    	err.status = 422;
		    	return next(err);
		    }

		    for(var i=0;i<user.length;i++){
		    	contacts[i] = user[i]._id;
		    	verified[i] = user[i].mobile;
		    }

			User.findByIdAndUpdate(currentUser._id,{ $set :{ contacts : contacts
					}    },function(err,updatedUser){
						console.log(updatedUser);
			res.json(verified);
			res.end("");
	});

	}) ;

});




module.exports = router;
