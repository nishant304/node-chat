var mongoose = require('mongoose');
var express = require('express');
var User =  require('../models/Users');

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


module.exports = router;
