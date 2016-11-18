# Chat Tutorial

This tutorial has two components, an authorization service and the client for chat.

## Authorization

Lively's Chat requires clients to use an access token that their service has published.

- Create an endpoint that will retrieve an access token from LivelyVideo for a given user (can be found in server/index.js)
- Instantiate the client library with that endpoint

This will enable the client library to retrieve authorization tokens and link the user to that chatroom.

Requests to Lively's Services should be executed from servers as they contain sensitive information, specifically a private key (token) for the company which is provided when you begin a new project with Lively Video.

## Chat

This is a full chat integration.  For more custom implementations, contact us for access to the core chat libraries.

The chat implementation can be found in client/index.js

## Running

		$ npm install
		$ npm run start
		visit localhost:7000

## Default Styles

Default styling can be found in ./node_modules/@livelyvideo/chat/dist/
