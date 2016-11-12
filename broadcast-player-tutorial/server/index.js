const express = require('express');
const router = module.exports = express.Router();
const request = require('request');
const path = require('path');

// Get listings from the private livelyvideo api
router.get('/listings', (req, res) => {
	request({
		uri: 'https://dev.livelyvideo.tv/api/ls/v1/live?token=a0a58f5a-fb21-4eb6-bb1f-b66f0f45d711',
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

// Get an access key for "flashuser" from the private livelyvideo api
// flashuser can be changed to anything
router.get('/access-key', (req, res) => {
	let uri = 'https://dev.livelyvideo.tv/api/ls/v1/key/flashuser?token=a0a58f5a-fb21-4eb6-bb1f-b66f0f45d711';

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
