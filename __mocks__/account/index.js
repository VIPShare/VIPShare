
export default {
	'/api/accounts': () => {
		return Promise.resolve([
      {
        id: 1,
        type: '爱奇艺',
        username: '175****273',
        editable: true,
      },
      {
        id: 2,
        type: '腾讯视频',
        username: '25****273',
        editable: false,
      },
    ]);
	},
  '/api/accounts/{id}': ({urlparams}) => {
    return Promise.resolve({
      id: urlparams.id,
      type: '爱奇艺',
      username: '1758738273',
      password: '123456',
    });
  },
  '/api/accounts/{id}/viewable': ({urlparams, params}) => {
    if (params.data.password !== '123456') {
      return Promise.resolve({
        id: urlparams.id,
        viewable: false,
        msg: 'no permission',
      });
    }
    return Promise.resolve({
      id: urlparams.id,
      viewable: true,
    });
  },
}
