const express = require('express');
const moment = require('moment');
const router = module.exports = express.Router();
const request = require('request');
const path = require('path');
const uuid = require('node-uuid');
const subdomain = 'dev';
const token = 'something-i-can-type';

// Get listings from the private livelyvideo api
router.get('/listings', (req, res, next) => {
	res.locals.userToken = uuid.v4();

	request({
		uri: `https://${subdomain}.livelyvideo.tv/auth/v1/access-tokens`,
		method: 'POST',
		headers: {
			Authorization: `Bearer ${token}`
		},
		json: {
			expire: moment.utc().add(1, 'days').format(),
			scopes: ['media'],
			userId: 'testuser',
			token: res.locals.userToken,
			// fingerprint: {
			// 	'user-agent': req.header('user-agent')
			// }
		}
	}, (err, response, body) => {
		if (err) {
			res.status(500).send('internal server error')
			return;
		}
		next();
	});
}, (req, res) => {

	// const fingerprint = `user-agent:::${req.header('user-agent')}`;
	request({
		uri: `https://${subdomain}.livelyvideo.tv/api/ls/v1/live?token=${res.locals.userToken}&user-token=${res.locals.userToken}`,
		method: 'GET',
		// headers: {
		// 	'x-fingerprint': fingerprint
		// },
		json: true
	}, (err, response, body) => {
		if (err) {
			res.status(500).send('internal server error')
			return;
		}
		res.status(response.statusCode).send(body);
	});
});

// Get an access key for the user from the private livelyvideo api
// the user can be changed to anything
const USER = `tutorialuser_${Math.floor(Math.random() * 1000)}`;
router.get('/access-key', (req, res) => {
	let uri = `https://${subdomain}.livelyvideo.tv/api/ls/v1/key/${USER}?token=${token}`;

	if (req.query.regenerate) {
		uri += `&regenerate=${req.query.regenerate}`;
	}

	request({
		uri: uri,
		method: 'GET',
		json: true
	}, (err, response, body) => {
		if (err) {
			res.status(500).send('internal server error')
			return;
		}
		res.status(response.statusCode).send(body);
	});
});

// serve dist as static files
router.use('/', express.static(path.join(__dirname, '..', 'dist')));
