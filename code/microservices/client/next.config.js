module.exports = {
    webpackDevMiddleware: config => {
        config.watchOptions = { aggregateTimeout: 300 };
        return config;
    }
};