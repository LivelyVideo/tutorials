# Broadcast/Player Tutorial

This tutorial has three components. A small API integration to interact with live services, a broadcaster, and a player.

## API Integration

Lively's Live Services (LS) is an API for all things live streaming related.

Found in server/index.js, there are two calls to Live services, one for getting an stream key to broadcast, and one for getting a list of active broadcasts.

Requests to LS should be executed from servers as they contain sensitive information - a private key (token) for the company.

## Broadcaster

This is a flash and eventually webrtc capable broadcaster with basic controls.  For more custom implementations, contact us for access to the core broadcaster library.

The broadcaster implementation can be found in client/index.js

## Player

This is a html5 dash over websockets, html5 hls, and flash rtmp capable player.  For more custom implementations, contact us for access to the core player and player driver libraries.

The player implementation can be found in client/index.js

Currently an mjpeg player fallback is not included, this is currently being discussed

## Running

		$ npm install
		$ npm run start
		visit localhost:7000

Start a broadcast using the flash broadcaster, and after a few seconds hit the "get listings" button

## Building the Client (dist/app.js)

		$ npm install
		$ npm run browserify

## Default Styles

Default styling can be found in ./node_modules/@livelyvideo/stock-broadcaster/dist/ and ./node_modules/livelyvideo/stock-live-player/dist/
