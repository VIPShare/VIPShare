import rest, { GET } from '../utils/rest';

export async function list() {
  return await GET('/accounts');
}
