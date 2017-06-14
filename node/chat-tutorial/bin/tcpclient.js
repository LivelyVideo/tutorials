#!/usr/bin/env node

const host = process.env.HOST;
const tcpport = process.env.TCPPORT ? process.env.TCPPORT : 9000;
const authport = process.env.AUTHPORT ? process.env.AUTHPORT : 80;
const chatport = process.env.CHATPORT ? process.env.CHATPORT : 80;
const room = process.env.ROOM ? process.env.ROOM : 'blt';
const token = process.env.TOKEN ? process.env.TOKEN : 'something-i-can-type';
const insecure = process.env.INSECURE === 'true';

if (!host) {
	console.log('HOST required');
	process.exit(1);
}

require('../tcpclient/index')(host, insecure, tcpport, authport, chatport, room, token, (err) => {
	process.exit(err ? 1 : 0);
});
