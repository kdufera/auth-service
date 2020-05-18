'use strict';

const express = require('express');
const router = express.Router();
const _ = require('lodash');
const {User} = require('./user');

router.post('/createUser',function(req, res) {
	let body = _.pick(req.body,['name','email', 'password']); //TODO: pass must be sent via header
	var user = new User({
		name:body.name,
		email:body.email,
		password:body.password
	});
	user.generateTestUser().then((data) => {
		if(data) {
			res.status(200).send();
		} else  {
			res.status(401).send();
		}
	}).catch((err) => {
		res.status(401).send();
	});
});

router.post('/login', function(req, res) {
	let body = _.pick(req.body,['username','password']); //TODO: pass must be sent via header
	let user = new User();
	user.findByCredentials(body.username, body.password).then((token) => {
		if(token) {
			res.status(200).send({token});
		} else {
			res.status(401).send();
		}
	}).catch((err) => {
		res.status(401).send();
	});
});

module.exports = router;
