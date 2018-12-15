const originalFetch = fetch;

function debugFetch(url, options) {
  return originalFetch(url, options)
    .then((response) => {
      const clone = response.clone();
      const headers = {};
      response.headers.forEach((val, key) => {
        headers[key] = val;
      });

      return response.json().then((data) => {
        console.debug('fetch', url, {
          request: {
            url,
            ...options,
          },
          response: {
            headers,
            status: response.status,
            body: data,
            ok: response.ok,
          },
        });

        return clone;
      })
    })
   .catch(error => {
     console.error('fetch', url, options, error);
     throw error;
   });
}

window.fetch = debugFetch;

export default originalFetch;
