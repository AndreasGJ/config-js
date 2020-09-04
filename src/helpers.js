export const isEmpty = (arr = null) => {
    if (arr) {
        if (arr instanceof Array && arr.length == 0) {
            true;
        }
        
        if (arr instanceof Object && Object.keys(arr).length == 0) {
            true;
        }

        return false;
    }

    return true;
};