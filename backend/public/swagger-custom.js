window.onload = function () {
  const ui = SwaggerUIBundle({
    url: '/api/docs-json',
    dom_id: '#swagger-ui',
    presets: [SwaggerUIBundle.presets.apis, SwaggerUIStandalonePreset],
    plugins: [SwaggerUIBundle.plugins.DownloadUrl],
    requestInterceptor: (req) => {
      // Add the Authorization header to all requests if the token is set
      const token = localStorage.getItem('access_token');
      if (token) {
        req.headers['Authorization'] = `Bearer ${token}`;
      }
      return req;
    },
    responseInterceptor: (res) => {
      if (res.url.endsWith('/auth/login') && res.status === 201) {
        console.log('Login response received:', res);
        if (res.body && res.body.access_token) {
          const token = res.body.access_token;
          console.log('Extracted token:', token);
          // Store the token in localStorage
          localStorage.setItem('access_token', token);
          console.log('Token set in localStorage');

          // Programmatically set the authorization in Swagger UI
          ui.authActions.authorize({
            JWT: {
              name: 'JWT',
              schema: {
                type: 'apiKey',
                in: 'header',
                name: 'Authorization',
                description: '',
                get: function(key) {
                  return this[key];
                },
              },
              value: `Bearer ${token}`,
            },
          });
          console.log('Token set in Swagger UI authorization state');
        } else {
          console.error('Token not found in response body');
        }
      }
      return res;
    },
    layout: 'StandaloneLayout',
    persistAuthorization: true,
  });

  // Manually set the authorization state on page load
  const token = localStorage.getItem('access_token');
  if (token) {
    ui.authActions.authorize({
      JWT: {
        name: 'JWT',
        schema: {
          type: 'apiKey',
          in: 'header',
          name: 'Authorization',
          description: '',
          get: function(key) {
            return this[key];
          },
        },
        value: `Bearer ${token}`,
      },
    });
    console.log(
      'Token loaded from localStorage and set in Swagger UI authorization state',
    );
  }

  window.ui = ui;
};
