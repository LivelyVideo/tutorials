const Parser = require('@livelyvideo/chat-parser-core');
const net = require('net');
const request = require('request');
const moment = require('moment');

module.exports = (host, insecure, tcpport, authport, chatport, room, token, cb) => {
	const proto = insecure ? "http" : "https"
	const authUri = authport === 80 ? `${proto}://${host}/auth/v1/access-tokens` : `${proto}://${host}:${authport}/auth/v1/access-tokens`
	const parserUri = chatport === 80 ? `${proto}://${host}/chat/v1/manifests/say/rooms/${room}/version` : `${proto}://${host}:${chatport}/chat/v1/manifests/say/rooms/${room}/version`
	const parser = new Parser.default(parserUri);
	request({
		uri: authUri,
		method: 'POST',
		rejectUnauthorized: false,
		requestCert: true,
		headers: {
			Authorization: `Bearer ${token}`
		},
		json: {
			expire: moment.utc().add(1, 'days').format(),
			scopes: ['chat'],
			userId: "tcp",
			chatUser: {
				username: "tcp"
			}
		}
	}, (err, response, body) => {
		if (err) {
			console.log(err)
			return
		}
		if (!body || !body.token) {
			console.log("unable to get token");
			return
		}

		const client = new net.Socket();

		client.on('data', (ms) => {
			ms.toString().split('\n').forEach((m) => {
				const message = m.toString();
				if (message) {
					console.log('unparsed: ', message);
					const firstSpace = message.indexOf(' ');
					const output = message.slice(0, firstSpace);
					if (output == 'msg') {
						const secondSpace = message.indexOf(' ', firstSpace + 1);
						const payload = message.slice(secondSpace + 1);

						// console.log(payload);
						parser.parseMessage(JSON.parse(payload), (err, cmd, data) => {
							if (err) {
								console.log(err);
								cb(err);
								return
							}

							console.log('parsed: ', message);
							console.log(data);
							console.log('---');
						});
					}	
				}
			})
		});

		client.connect(tcpport, host, () => {
			client.write(`/rooms/${room}?auth=${body.token}\n`);
			console.log('Connected');
		});

		client.on('close', () => {
			console.log('Connection closed');
			cb();
		});
	});
}