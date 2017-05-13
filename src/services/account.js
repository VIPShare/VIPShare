import rest, { GET } from '../utils/rest';

export async function list() {
  return await GET('/api/accounts');
}

export async function item(id) {
  return await GET(`/api/accounts/${id}`);
}
