const express = require('express');
const router = module.exports = express.Router();
const request = require('request');
const path = require('path');
const moment = require('moment');

const ROOM_NAME = 'blt';
const OWNER = 'owner';

router.get('/access-token', (req, res) => {
	// this request creates an access token
	// access tokens are paired with user and grant access for that user to specific scopes
	// access tokens are intended to be used directly by users on clients in cookies or auth headers
	request({
		uri: 'http://localhost:8090/auth/v1/access-tokens',
		method: 'POST',
		rejectUnauthorized: false,
		requestCert: true,
		headers: {
			Authorization: 'Bearer something-i-can-type'
		},
		json: {
			expire: moment.utc().add(1, 'days').format(),
			scopes: ['chat'],
			userId: req.query.username,
			admin: req.query.role == 'admin',
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

		if (req.query.role && req.query.role != "admin") {
			request({
				method: 'PATCH',
				uri: `http://localhost:8080/chat/private/v1/rooms/${ROOM_NAME}/users/${req.query.username}`,
				rejectUnauthorized: false,
				requestCert: true,
				headers: {
					Authorization: 'Bearer something-i-can-type'
				},
				json: {
					role: req.query.role
				}
			}, (rerr, rresponse, rbody) => {
				if (rerr) {
					console.error('role not updated', rerr);
					process.exit(1);
				}
				if (rresponse.statusCode > 399) {
					console.error('role not updated', {
						code: rresponse.statusCode,
						error: JSON.stringify(rbody, null, '  ')
					});
					process.exit(1);
				}
				res.status(response.statusCode).send(body);
			});
			return
		}
		res.status(response.statusCode).send(body);
	});
});


function createRoomIfNotExists() {
	// this function creates a room, or updates it if exists

	// create the owner user if they do not exist
	request({
		method: 'POST',
		uri: 'http://localhost:8080/chat/private/v1/users',
		rejectUnauthorized: false,
		requestCert: true,
		headers: {
			Authorization: 'Bearer something-i-can-type'
		},
		json: {
			id: OWNER,
			username: OWNER
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
			uri: 'http://localhost:8080/chat/private/v1/rooms',
			rejectUnauthorized: false,
			requestCert: true,
			headers: {
				Authorization: 'Bearer something-i-can-type'
			},
			json: {
				owner: OWNER,
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