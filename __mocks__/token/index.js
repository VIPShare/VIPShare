import fetchMock from 'fetch-mock';

fetchMock.post('/api/oauth2/token', {
    token: 'testToken',
    value: 'testRefreshToken',
});


