import authStore from '../stores/AuthStore';
import config from '../config';

const apiFetch = (url, method = 'GET', body = null) => {
  const req = {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  if (body) {
    req.body = JSON.stringify(body);
  }
  if (authStore.authToken) {
    req.headers.Authorization = `Bearer ${authStore.authToken}`;
  }

  console.info(`Sending [${method}] ${url}`, req);

  return fetch(`${config.API_URL}/api${url}`, req)
  .then(async (resp) => {
    const respBody = await resp.json().catch(() => {});
    if (!resp.ok) {
      throw resp;
    }
    return respBody;
  });
};

export default apiFetch;
