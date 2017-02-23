import LivelyUpload from '@livelyvideo/upload';
import StockPlayer from '@livelyvideo/stock-vod-player';
import xhr from 'xhr';
import text from 'text-content';

/**
Set up the upload instance

Params:
	- html element
	- options
			url: (Required) Route to your upload api.
			authUrl: (Required) Route to your auth api.
			redirect: Defaults to null. The redirect route to your results template for cross-origin form compatibility.
			accept: Defaults to null. Sets the value of accept attribute on file input.
			supportLegacy: Defaults to true. Turn legacy support on or off.
			forceLegacy: Defaults to false. Helpful option to force use of legacy form for debugging.
			autoSubmit: Defaults to true. Automatically upload file when added to the uploader.
			MESSAGES: (Localization) Object containing list of message names and message strings.
				ERROR_NETWORK - Network error.
				ERROR_DUP_FILE - This file has already been uploaded.
				ERROR_FILE_NAME - This file does not have a name.
				ERROR_FILE_EXT - This file extension is not supported.
				ERROR_MISSING_BODY - This file does not have any data.
				ERROR_FILE_SIZE - This file exceeds max file size.
				ERROR_UNAUTH - The user is not authorized to perform this action.
				ERROR_DEFAULT - Error.
				ERROR_CANCEL - Upload has been canceled.
				ERROR_URL - Invalid url.
				ERROR_EL - The constructor has not been given a valid element or selector.
				UNSUPPORTED_BROWSER - Your browser does not support HTML5 upload. We recommend upgrading your browser.
				TITLE - Drop files here or click to upload.
				SUBTITLE - Max file size 48Mb.
				LEGACY_TITLE - Click to upload.
				LEGACY_SUBTITLE - File preview and drag and drop unavailable. Please upgrade your browser for a better experience. |
**/
const upload = new LivelyUpload(document.querySelector('.upload'), {
	url: 'https://dev.livelyvideo.tv/api/upload/v2',
	authUrl: 'http://localhost:7000/access-token'
});
window.upload = upload;

// Play a video
/**
Function to load the stock player, triggered later by a click event on <a> tags generated by the "get listings" button

Params:
	- html element
	- manifest url, returned by the listings endpoint located in server.js
	- player options
		> autoplay: [true] autoplays the stream when it loads
		> bitrate: [undefined] null for adaptive when available, desired kbps otherwise
		> drivers: ["mp4", "nativeHls", "jsHls", "flash", lodef"] driver priority
		> debug: [false] enables debug logging
		> recoverErrorCount: [10] Playback error count to recover the entire driver on
		> forceDrivers:	[false]
		> muted: whether or not the driver is muted
		> pollingInterval: [10000] ms timeout to wait before polling again
		> volume: [0.75] 0-1 volume
	- controls options
		> popout: popout options
		> popout[].url: url for popout
		> popout[].width: width for popout in px
		> popout[].height: height for popout in px

Events:
	- error emitted with all errors
	- exit-fullscreen
	- enter-fullscreen
	- bitrate-switch
	- select-driver
	- manifest
	- play
	- stop
	- pause
	- stall
	- progress
	- timeupdate
	- mute
	- unmute
	- volume
	- online
	- offline
	- estimated-bw
	- user-active
	- user-idle
**/
let stockPlayer;
function loadPlayer (manifest) {
	return (e) => {
		e.preventDefault();
		if (stockPlayer) {
			stockPlayer.destroy();
		}

		window.stockPlayer = stockPlayer = new StockPlayer(document.querySelector('#player'), manifest, {
			drivers: ['hlsjs', 'hls', 'flashHls', 'mp4'],
			hlsjsPath: 'http://dailymotion.github.io/hls.js/dist/hls.js',
			flashlsPath: './flashlsChromeless.swf',
		});
	};
}

// Videos
const videosContainer = document.querySelector('.videos');


function loadVideos() {
	xhr({
		method: 'GET',
		uri: '/videos',
		json: true
	}, (err, response, body) => {
		if (err) {
			console.error('get videos error', err);
			return;
		}

		if (response.statusCode > 399) {
			console.error('get videos error', {
				code: response.statusCode,
				body
			})
			return;
		}

		while (videosContainer.children.length) {
			videosContainer.children[0].remove();
		}

		for (let i = 0; i < body.results.length; i++) {
			const videoEntry = document.createElement('div');
			const videoLink = document.createElement('a');
			videoLink.setAttribute('href', '#');
			videoEntry.appendChild(videoLink);

			videoLink.onclick = loadPlayer(body.results[i].manifest);
			text(videoLink, `video uploaded by ${body.results[i].userId} on ${body.results[i].dateEnd}`);
			videosContainer.appendChild(videoEntry);
		}
	});
}

const loadVideosButton = document.querySelector('.loadvideos');
loadVideosButton.onclick = () => {
	loadVideos();
};
loadVideos();
