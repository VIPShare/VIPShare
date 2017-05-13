import rest, { GET } from '../utils/rest';

export async function info() {
  return await GET('/api/mine/info');
}
