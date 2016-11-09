var mongoose = require('mongoose');
var express = require('express');
var User =  require('../models/Users');
var verify=  require('./verify');

var router = express.Router();
var db = mongoose.connection;

router.post('/register',function(req,res,next){
	console.log(req.body);
	User.create(req.body,function(err,User){
		if(err){
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
	console.log(req.body);

	User.findOne({name:req.body.mobile,password:req.body.password},function(err,use){
		if(err){
			var err = new Error('User not found');
			err.status = 401;
			next(err);
			return ;
		}
		console.log(use._id);
		res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end(verify.getToken(use[0]));
	});


	
		

	//});
});


module.exports = router;
