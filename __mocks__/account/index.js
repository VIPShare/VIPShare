
export default {
	'/api/accounts': () => {
		return Promise.resolve([
      {
        type: '爱奇艺',
        account: '175****273',
      }
    ]);
	},
  '/api/accounts/{id}': ({urlparams}) => {
    return Promise.resolve({
      id: urlparams.id,
      type: '爱奇艺',
      account: '1758738273',
      password: '123456',
    });
  }
}
