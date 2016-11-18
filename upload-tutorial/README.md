# Upload Tutorial

This tutorial has four components:

- An authorization integration for upload, retrieving transcoded videos, and playing videos (found in server/index.js)
- An upload client (found in client/index.js)
- An api integration to retrieve live videos (found in server/index.js)
- A vod player (found in client/index.js)

## Authorization

Lively's Upload requires clients to use an access token that their service has published.

1) Create an endpoint that will retrieve an access token from LivelyVideo for a given user
2) Instantiate the client library with that endpoint

This will enable the client library to retrieve authorization tokens as shown in server/index.js with the `getAccessToken` method

Requests to Lively's Authorization Service should be executed from servers as they contain sensitive information, specifically a private key (token) for the company which is provided when you begin a new project with Lively Video.

If a video is uploaded, it will immediately be transcoded and retrievable through the xcode API, see server/index.js#51.

Tutorials coming soon for uploading assets other than videos.

## Video Authorization

To play a video, a manifest must have a valid access token with the "media" scope.  This access token can either be manually applied to the manifest, or can be provided as a query param on the request "user-token", and it will be hydrated.  The latter can be seen in server/index.js#49

## Upload

This is a full upload integration.  For more custom implementations, contact us for access to the core upload libraries.

The upload implementation can be found in client/index.js

## Running

		$ npm install
		$ npm run start
		visit localhost:7000

## Default Styles

Default styling for upload can be found in ./node_modules/@livelyvideo/upload/dist/

Default styling for the video be found in ./node_modules/@livelyvideo/stock-vod/dist/
