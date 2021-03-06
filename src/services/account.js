import rest, { GET, POST, PUT } from '../utils/rest';

export async function list() {
  return await GET('/api/accounts');
}

export async function item(id) {
  return await GET(`/api/accounts/${id}`);
}

export async function viewable(id, password) {
  return await POST(`/api/accounts/${id}/viewable`, {
    password,
  });
}

export async function create(account) {
  return await POST('/api/accounts', {
    ...account,
  });
}

export async function update(account) {
  return await PUT(`/api/accounts/${account.id}`, {
    ...account,
  });
}
