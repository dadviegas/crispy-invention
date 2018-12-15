import originalFetch from './overrideFetch';

function sendData(url, data) {
  originalFetch(`${url}/api/log`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export default sendData;
