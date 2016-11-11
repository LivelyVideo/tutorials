import Chat from '@livelyvideo/chat';

/**
Set up the chat instance

Params:
	- html element
	-
	user	(string)	(Required) Defaults to null. Current username.
	room	(string)	(Required) Defaults to null. Room name.
	apiHost	(string)	(Required) Defaults to null. Route to host of chat api.
	websocketHost	(string)	(Required) Defaults to null. Route to host of chat websocket.
	url	(string)	(Required) Defaults to null. Auth url.
**/
let chat;
function createChat(user, el) {
	if (chat) {
		chat.destroy();
	}
	chat = new Chat(el, {
		user: user,
		room: 'testroom',
		apiHost: 'https://dev.livelyvideo.tv',
		websocketHost: 'ws://ws-dev.livelyvideo.tv',
		authUrl: `/access-token`,
	});
}

document.querySelector('#pickuser').onsubmit = (e) => {
	e.preventDefault();
	createChat(e.target.querySelector('[name=username]').value, document.querySelector('.chat'));
	e.target.setAttribute('disabled', true);
	e.target.querySelector('[name=username]').value = '';
};
