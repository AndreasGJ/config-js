import { isEmpty } from './helpers';

let configData = {};

export const setup = (params) => {
    let configs = {};

    if(typeof params === "string"){
        const configFiles = require.context(params, true, /\.js$/);
        configFiles.keys().forEach(key => {
            const configFile = configFiles(key);
            if (typeof configFile.default === "object" && !key.match(/index\.js/)) {
                const k = key.replace(/(\/|\.js|\.)/g, "");
                configs[k] = configFile.default;
            }
        });
    } else if(typeof params === "object") {
        configs = params;
    }

    let quickConfigs = {};

    const quickKeys = Object.keys(configs);
    if (!isEmpty(quickKeys)) {
        const implodeNestingToQuickKeys = (obj, prefix = "") => {
            for (let k in obj) {
                const configKey = (prefix ? prefix + "." : "") + k;
                const configValue = obj[k];

                quickConfigs[configKey] = configValue;

                if (configValue instanceof Object) {
                    implodeNestingToQuickKeys(configValue, configKey);
                }
            }
        };

        quickKeys.forEach(key => {
            implodeNestingToQuickKeys(configs[key], key);
        });
    }

    configData = quickConfigs;

    return configData;
};

export default () => {
    return configData;
};