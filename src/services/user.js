import rest, { GET, POST } from '../utils/rest';

export async function list() {
  return await GET('/api/users');
}
