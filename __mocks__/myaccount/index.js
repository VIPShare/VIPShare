
export default {
	'/api/mine/accounts': () => {
		return Promise.resolve([
      {
        id: 1,
        type: '爱奇艺',
        username: '175****273',
        editable: true,
      }
    ]);
	}
}
