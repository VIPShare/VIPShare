import rest, { accessToken, POST } from '../utils/rest';

export async function login(username, password) {
  return await accessToken(username, password);
}

export async function signup(user) {
  return await POST('/api/signup', user);
}
