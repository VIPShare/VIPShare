import rest, { parseError, GET } from '../utils/rest';

export async function list() {
  return await GET('/accounts');
}
