## Quick Start

		$ npm install
		$ npm run browserify
		$ php -S localhost:8000
		visit localhost:7000

# Upload Tutorial

This tutorial has four components:

- An authorization integration for upload, retrieving transcoded videos, and playing videos (found in index.php)
- An upload client (found in js/index.js)
- An api integration to retrieve live videos (found in videos.php)
- A vod player (found in js/index.js)

## Authorization

Lively's Upload requires clients to use an access token that their service has published.

- Create an endpoint that will retrieve an access token from LivelyVideo for a given user (can be found in access-token.php)
- Instantiate the client library with that endpoint

This will enable the client library to retrieve authorization tokens as shown in access-token.php with the `getAccessToken` method

Requests to Lively's Authorization Service should be executed from servers as they contain sensitive information, specifically a private key (token) for the company which is provided when you begin a new project with Lively Video.

If a video is uploaded, then it will immediately be transcoded and retrievable through the xcode API, see videos.php#7.

## Video Authorization

To play a video, a manifest must have a valid access token with the "media" scope.  This access token can either be manually applied to the manifest, or can be provided as a query param on the request "user-token", and it will be hydrated.  The latter can be seen in access-token.php

## Upload

This is a full upload integration.  For more custom implementations, contact us for access to the core upload libraries.

The upload implementation can be found in js/index.js

## Default Styles

Default styling for upload can be found in ./node_modules/@livelyvideo/upload/dist/
Default styling for the video be found in ./node_modules/@livelyvideo/stock-vod/dist/

