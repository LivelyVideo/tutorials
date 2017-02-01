const express = require('express');
const router = module.exports = express.Router();
const request = require('request');
const path = require('path');
const moment = require('moment');

function getAccessToken(scopes) {
	// this is done as a generator so it can be used everywhere access tokens
	// it attaches the access token to res.locals so it can be used by middleware further down
	return (req, res, next) => {
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
				scopes: scopes,
				userId: 'demouser'
			}
		}, (err, response, body) => {
			if (err) {
				res.status(500).send('internal server error')
				return;
			}

			if (response.statusCode > 399) {
				res.status(response.statusCode).send(body);
				return;
			}

			res.locals.tokenBody = body;
			next();
		});
	}
}

// this is for the upload library, it requires the user is authorized and checks on uploaded chunks
router.get('/access-token', getAccessToken(['upload']), (req, res, next) => {
	res.send(res.locals.tokenBody);
});

router.get('/videos', getAccessToken(['media']), (req, res) => {
	// this gets transcoded videos
	request({
		uri: 'https://dev.livelyvideo.tv/api/xcode/videos',
		method: 'GET',
		rejectUnauthorized: false,
		requestCert: true,
		headers: {
			Authorization: 'Bearer something-i-can-type'
		},
		qs: {
			limit: 30,
			offset: 0,
			// CREATED
			// INPROGRESS
			// COMPLETED
			// ABORTED
			status: 'COMPLETED',
			// the access token is added to the manifests so that we can guarantee the user should be viewing the video
			'user-token': res.locals.tokenBody.token
		}
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
