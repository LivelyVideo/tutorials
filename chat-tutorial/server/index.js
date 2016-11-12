const express = require('express');
const router = module.exports = express.Router();
const request = require('request');
const path = require('path');
const moment = require('moment');

router.get('/access-token', (req, res) => {
	// this request creates an access token
	// access tokens are paired with user and grant access for that user to specific scopes
	// access tokens are intended to be used directly by users on clients in cookies or auth headers
	request({
		uri: 'https://dev.livelyvideo.tv/auth/v1/access-tokens',
		method: 'POST',
		rejectUnauthorized: false,
		requestCert: true,
		headers: {
			Authorization: 'Bearer a0a58f5a-fb21-4eb6-bb1f-b66f0f45d711'
		},
		json: {
			expire: moment.utc().add(1, 'days').format(),
			scopes: ['chat'],
			userId: req.query.username,
			chatUser: {
				avatar: null,
				username: req.query.username
			}
		}
	}, (err, response, body) => {
		if (err) {
			res.status(500).send('internal server error')
			return;
		}
		res.status(response.statusCode).send(body);
	});
});

function createRoomIfNotExists() {
	// this function creates a room, or updates it if exists
	// the name of the room cannot change, the title will be displayed in the UI
	request({
		method: 'POST',
		uri: 'https://dev.livelyvideo.tv/chat/private/v1/rooms',
		rejectUnauthorized: false,
		requestCert: true,
		headers: {
			Authorization: 'Bearer a0a58f5a-fb21-4eb6-bb1f-b66f0f45d711'
		},
		json: {
			owner: 'owner',
			name: 'testroom2',
			title: 'Test Room'
		}
	}, (err, response, body) => {
		if (err) {
			console.error('room not created');
			process.exit(1);
		}
		if (response.statusCode > 399) {
			console.error('room not created', {
				code: response.statusCode,
				error: body
			});
			process.exit(1);
		}
	});
}
createRoomIfNotExists();

// serve dist as static files
router.use('/', express.static(path.join(__dirname, '..', 'dist')));
