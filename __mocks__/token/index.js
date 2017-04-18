
export default {
	'/api/oauth2/token': () => {
		return Promise.resolve({
			token: 'testToken',
			value: 'testRefreshToken',
		});
	}
}
