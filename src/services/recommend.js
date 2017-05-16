import rest, { GET } from '../utils/rest';

export async function list(pageNumber, pageSize) {
  return await GET(`/api/recommends?pageNumber=${pageNumber}&pageSize=${pageSize}`);
}

export async function item(id) {
  return await GET(`/api/recommends/${id}`);
}

export async function top() {
  return await GET('/api/recommends/tops');
}
