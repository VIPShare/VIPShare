
export default {
	'/api/accounts': () => {
		return Promise.resolve([
      {
        id: 1,
        type: '爱奇艺',
        username: '175****273',
      }
    ]);
	},
  '/api/accounts/{id}': ({urlparams}) => {
    return Promise.resolve({
      id: urlparams.id,
      type: '爱奇艺',
      username: '1758738273',
      password: '123456',
    });
  }
}
