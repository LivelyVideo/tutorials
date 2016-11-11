import Chat from '@livelyvideo/chat';

/**
Set up the chat instance

Params:
	- html element
	-
	user: users username, should be unique to the user
	room: room name
	apiHost: lively chat api
	websocketHost: lively ws api
	url: the company's auth url, which should access livelyvideo to create an access token for the user
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
