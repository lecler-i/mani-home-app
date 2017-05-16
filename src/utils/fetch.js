import appStore from '../stores/AppStore';
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
  if (appStore.authToken) {
    req.headers.Authorization = `Bearer ${appStore.authToken}`;
  }

  console.info(`[${method}] ${url}`, req);

  return fetch(`${config.API_URL}/api${url}`, req)
  .then(async (resp) => {
    const respBody = await resp.json().catch(() => {});
    if (!resp.ok) {
      throw respBody;
    }
    return respBody;
  });
};

export default apiFetch;
