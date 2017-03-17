import appStore from '../stores/AppStore';
//import config from '../config';
const API_URL = 'https://dev.ushift.com';

const apiFetch = (url, method = 'GET', body = null) => {
  let data = {
    method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  };

  if (!!body) data.body = JSON.stringify(body);
  if (!!appStore.authToken) data.headers.Authorization = `Bearer ${appStore.authToken}`;
  console.log(`Sending ${method}:${url}`, body);

  return fetch(`${API_URL}/api${url}`, data)
  .then(async (resp) => {
    console.log('Getting response...');
    const body = await resp.json().catch(() => {});
    console.log('Response :', body);
    if (!resp.ok) {
      throw body;
    }
    return body;
  });
}

export default apiFetch;
