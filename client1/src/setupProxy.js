const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api/**',
    createProxyMiddleware({
      target: 'http://localhost:5010',
      changeOrigin: true
    })
  )

  app.use(
    '/auth/google',
    createProxyMiddleware({
      target: 'http://localhost:5010'
    })
  )
};