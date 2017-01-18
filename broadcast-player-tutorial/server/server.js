const express = require('express');

const app = express();

app.use(require('./index'));

// run the server
const server = app.listen(process.env.PORT || 7000, () => {
	const port = server.address().port;

	console.log('server listening', {port});
});
