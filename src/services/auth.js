import rest, { accessToken } from '../utils/rest';

export async function login(username, password) {
  return await accessToken(username, password);
}
