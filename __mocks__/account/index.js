
export default {
	'/api/accounts': () => {
		return Promise.resolve([
      {
        name: 'test',
        subtitle: 'test',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
      }
    ]);
	}
}
