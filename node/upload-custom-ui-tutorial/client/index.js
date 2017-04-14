import LivelyUpload from '@livelyvideo/upload';
import StockPlayer from '@livelyvideo/stock-vod-player';
import xhr from 'xhr';
import text from 'text-content';

/**
 * This is a guide building a custom upload ui
 */

/**
 * Example 1: Vanilla Upload
 *
 * This is an example implementation using basic settings.
 * Vanilla upload requires 'upload.min.css' to be styled properly
 * Include in your html <link type="text/css" rel="stylesheet" href="/upload.min.css">
 *
 * The only required options are 'host' and 'authUrl'.
 * @param {string} options.host - Destination host of your uploads
 * @param {string} options.authUrl - Route to retreive access tokens that authorize you to use host
 */
const uploadVanilla = new LivelyUpload(document.querySelector('#upload-vanilla'), {
	host: 'dev.livelyvideo.tv',
	authUrl: 'http://localhost:7000/access-token'
});

/**
 * Example 2: Custom Multiple Upload
 *
 * This is an example implementation of a custom multiple upload interface.
 * 
 * Step 1: 
 * To not overlap styles with the vanilla upload we are going to give our upload the bemPrefix 'upload-multiple'
 * This will prefix all of the upload class names with 'upload-multiple'
 *
 * Step 2:
 * In this example we want to disable 'drag and drop' and only use a button to select files
 * If we pass a DOM element in the 'selectTarget' option, that element will now open file selection on 'click'
 *
 * Step 3:
 * We want to append our previews somewhere else, not in our constructor div 
 * To achieve this we pass a DOM element to the 'previewsTarget' option
 *
 * Step 4: 
 * We now have all the parts in place to style our custom interface
 * Check out 'dist/upload-multiple' for an example styling
 *
 * @param {string} [options.bemPrefix=upload] - Prefix for DOM classes
 * @param {object} [options.selectTarget] - Select a custom DOM element to open file select on click, disables drag and drop
 * @param {object} [options.previewsTarget] - Select a custom DOM element for previews to be appended to
 */
const uploadMultipleSelectTarget = document.querySelector('#upload-multiple__select-target');
const uploadMultiplePreviewsTarget = document.querySelector('#upload-multiple__previews-target');
const uploadMultiple = new LivelyUpload(document.querySelector('#upload-multiple'), {
	host: 'dev.livelyvideo.tv',
	authUrl: 'http://localhost:7000/access-token',
	bemPrefix: 'upload-multiple',
	selectTarget: uploadMultipleSelectTarget,
	previewsTarget: uploadMultiplePreviewsTarget
});

/**
 * Example 2: Custom Avatar Upload
 *
 * This is an example implementation of a custom single upload interface.
 * 
 * Step 1: 
 * To not overlap styles with the vanilla upload we are going to give our upload the bemPrefix 'upload-single'
 * This will prefix all of the upload class names with 'upload-single'
 *
 * Step 2:
 * We will set the 'multiple' option to false which allow selection for only one file and keep a single preview
 *
 * Step 3:
 * We will set the 'accept' option to 'image/*' to only allow image files to be added to upload
 *
 * Step 4: ***See Code Below***
 * We will use the 'success' event listener to manage our interface state 
 * In this case we will change the avatar to whatever image was successfully uploaded
 *
 * Step 5: 
 * We now have all the parts in place to style our custom interface
 * Check out 'dist/upload-avatar' for an example styling
 *
 * @param {string} [options.bemPrefix=upload] - Prefix for DOM classes
 * @param {string} [options.accept] - Accept field for upload accept attribute
 * @param {bool} [options.multiple=true] - Allow multiple files for upload
 */
 const uploadAvatar = new LivelyUpload(document.querySelector('#upload-avatar'), {
 	host: 'dev.livelyvideo.tv',
 	authUrl: 'http://localhost:7000/access-token',
 	bemPrefix: 'upload-avatar',
 	multiple: false,
 	accept: 'image/*'
 });

// Step 4:
 window.uploadAvatar = uploadAvatar;
 window.uploadAvatar.on('success', function(file, fileURI, fileID) {
 	const uploadAvatarImage = document.querySelector('#upload-avatar__image');
 	uploadAvatarImage.style.backgroundImage = 'url(' + fileURI + '?token=' + uploadAvatar.upload.options.token + ')';
 });
