const originalFetch = fetch;

function debugFetch(url, options = {}) {
  const request = originalFetch(url, options);
  const startTime = Date.now();
  return request
    .then((response) => {
      const clone = response.clone();
      const headers = {};
      response.headers.forEach((val, key) => {
        headers[key] = val;
      });

      return clone.json().then((data) => {
        const endTime = Date.now();
        console.info('fetch', {
          type: 'request',
          startTime,
          endTime,
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

        return response;
      })
    })
   .catch(error => {
    const endTime = Date.now();
     console.error('fetch error', {
       type: 'request',
       startTime,
       endTime,
       request: {
        url,
        ...options,
       },
       error,
     });

     throw error;
   });
}

window.fetch = debugFetch;

export default originalFetch;
