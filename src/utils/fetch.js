import appStore from '../stores/AppStore';
//import config from '../config';
const API_URL = 'http://192.168.2.3:4000';

const apiFetch = (url, method = 'GET', body = null) => {
  let data = {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  if (!!body)
    data.body = JSON.stringify(body);
  if (!!appStore.authToken)
    data.headers.Authorization = `Bearer ${appStore.authToken}`;

  console.info(`[${method}] ${url}`, data);

  return fetch(`${API_URL}/api${url}`, data)
  .then(async (resp) => {
    const body = await resp.json().catch(() => {});
    if (!resp.ok) {
      throw body;
    }
    return body;
  });
};

export default apiFetch;
