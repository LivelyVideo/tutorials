const express = require('express');
const router = module.exports = express.Router();
const request = require('request');
const path = require('path');
const moment = require('moment');

const ROOM_NAME = 'blt';
const OWNER = {
	id: 'owner_id',
	username: 'owner'
};

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
			Authorization: 'Bearer something-i-can-type'
		},
		json: {
			expire: moment.utc().add(1, 'days').format(),
			scopes: ['chat'],
			userId: `${req.query.username}_id`,
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

	// create the owner user if they do not exist
	request({
		method: 'POST',
		uri: 'https://dev.livelyvideo.tv/chat/private/v1/users',
		rejectUnauthorized: false,
		requestCert: true,
		headers: {
			Authorization: 'Bearer something-i-can-type'
		},
		json: {
			id: OWNER.id,
			username: OWNER.username
		}
	}, (err, response, body) => {
		if (err) {
			console.error('user not created', err);
			process.exit(1);
		}
		if (response.statusCode > 399) {
			console.error('user not created', {
				code: response.statusCode,
				error: JSON.stringify(body, null, '  ')
			});
			process.exit(1);
		}

		// the name of the room cannot change, the title will be displayed in the UI
		request({
			method: 'POST',
			uri: 'https://dev.livelyvideo.tv/chat/private/v1/rooms',
			rejectUnauthorized: false,
			requestCert: true,
			headers: {
				Authorization: 'Bearer something-i-can-type'
			},
			json: {
				owner: OWNER.id,
				name: ROOM_NAME,
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
	});
}
createRoomIfNotExists();

// serve dist as static files
router.use('/', express.static(path.join(__dirname, '..', 'dist')));
