module.exports = {
    lintOnSave: false,
    productionSourceMap: false,
    css: {
        extract: false
    },
    configureWebpack: config => {
        if (process.env.NODE_ENV !== 'development') {
            config.externals = {
                "echarts": "echarts"
            };
        }
    }
};
