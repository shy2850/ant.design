exports.localhost = {
    root: __dirname,
    welcome: 'index.html',
    port: 8899,
    gzip: true,
    babel: {
        only: '*.jsx',
        plugins: ["transform-es2015-modules-umd"],
        presets: ['react', 'es2015']
    },
    filter: {
        get: function (req, resp) {
            if (req.url.match(/^[^\.]+$/)) {
                req.url = '/index.html';
            }
        }
    },
    agent: {
        get: function (pathname) {
            return {
                host: '127.0.0.1',
                port: 8899,
                path: function (url) {
                    return '/ant-design' + url.path;
                }
            };
        }
    }
};