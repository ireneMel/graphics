const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'https://localhost:8080',
            changeOrigin: true,
            secure: false // Set this to false if your backend is using a self-signed certificate
        })
    );
};
