import getData from './data';

export default (key, value = false, defaultValue = false) => {
    let config = getData()[key];

    if (typeof config === "string" || typeof config === "number") {
        if (value !== undefined && typeof value === "object") {
            Object.keys(value).forEach(k => {
                config = config.replace(`:${k}`, value[k]);
            });
        }
        return config;
    } else if (typeof config === "object" || typeof config === "function") {
        return config;
    }

    if (!defaultValue){
        console.log("config not found:", `"${key}"`, quickConfigs);
    }

    return defaultValue || noneStr;
};
