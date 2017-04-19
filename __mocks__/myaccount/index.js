
export default {
	'/api/mine/accounts': () => {
		return Promise.resolve([
      {
        name: 'mine',
        subtitle: 'mine',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
      }
    ]);
	}
}
