import request, { parseError } from './request';

function accessToken(username, password) {
  return request('/oauth2/token', {
    method: 'POST',
    headers: {
      'Authorization': 'Basic YXBwOnNlY3JldA==',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `grant_type=password&username=${username}&password=${password}`,
  })
}

function _pre(url) {

}
