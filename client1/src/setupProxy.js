const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api/**',
    createProxyMiddleware({
      target: 'https://stock-simu.herokuapp.com/',
      changeOrigin: true
    })
  )

  app.use(
    '/auth/google',
    createProxyMiddleware({
      target: 'https://stock-simu.herokuapp.com/'
    })
  )
};