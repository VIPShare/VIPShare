import rest, { GET } from '../utils/rest';

export async function list() {
  return await GET('/api/recommends');
}

export async function top() {
  return await GET('/api/tops');
}
