import rest, { GET, PUT, UPLOAD } from '../utils/rest';

export async function info() {
  return await GET('/api/mine/info');
}

export async function statistics() {
  return await GET('/api/mine/statistics');
}

export async function update(account) {
  return await PUT('/api/mine/info', account);
}

export async function avatar(avatar) {
  return await UPLOAD('/api/mine/avatar', {
    avatar,
  });
}
