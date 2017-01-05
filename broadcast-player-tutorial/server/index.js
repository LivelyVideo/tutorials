const express = require('express');
const router = module.exports = express.Router();
const request = require('request');
const path = require('path');

// Get listings from the private livelyvideo api
router.get('/listings', (req, res) => {
	request({
		uri: 'https://dev.livelyvideo.tv/api/ls/v1/live?token=something-i-can-type',
		method: 'GET',
		rejectUnauthorized: false,
		requestCert: true,
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
	let uri = `https://dev.livelyvideo.tv/api/ls/v1/key/${USER}?token=something-i-can-type`;

	if (req.query.regenerate) {
		uri += `&regenerate=${req.query.regenerate}`;
	}

	request({
		uri: uri,
		method: 'GET',
		rejectUnauthorized: false,
		requestCert: true,
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
