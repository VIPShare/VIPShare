import rest, { GET, PUT } from '../utils/rest';

export async function info() {
  return await GET('/api/mine/info');
}

export async function update(account) {
  return await PUT('/api/mine/info', account);
}
