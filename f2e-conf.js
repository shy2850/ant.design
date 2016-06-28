exports.localhost = {
    root: __dirname,
    welcome: 'index.html',
    port: 8899,
    gzip: true,
    cdn: true,
    filter: {
        get: function (req, resp) {
            if (req.url.match(/^[^\.]+$/)) {
                req.url = '/ant-design/index.html';
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