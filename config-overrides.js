/* config-overrides.js */

const rewireYAML = require('react-app-rewire-yaml')

// https://github.com/facebook/create-react-app/issues/9870
const getCssLoaders = (config) => {
    const loaderFilter = (rule) => rule.loader && rule.loader.includes('/css-loader')

    let loaders = config.module.rules.find((rule) => Array.isArray(rule.oneOf)).oneOf

    loaders = loaders.reduce((ldrs, rule) => ldrs.concat(rule.use || []), [])

    return loaders.filter(loaderFilter)
}

module.exports = function override(config, env) {
    // Fix url('/images/....') being processed by css-loader 4 =/
    for (const loader of getCssLoaders(config)) {
        loader.options.url = (url) => url.startsWith('.')
    }

    config = rewireYAML(config, env)
    return config
}
