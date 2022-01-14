/*
数据类型工具类
 */

class dataUtil {

    /*
    https://blog.csdn.net/happy81997/article/details/96476856
    */

    static isString(arg) {
        return arg && typeof(arg) === "string";
    }

    static isNumber(arg) {
        return arg && typeof(arg) === "number" && !isNaN(arg);
    }

    static isBoolean(arg) {
        return arg === !!arg;
    }

    static isArray(arg) {
        return Object.prototype.toString.call(arg) === '[object Array]';
    }

    static isObject(arg) {
        return Object.prototype.toString.call(arg) === '[object Object]';
    }

    static isFunction(arg) {
        return Object.prototype.toString.call(arg) === '[object Function]';
    }

    static isEmpty(arg) {
        return Object.keys(arg).length === 0;
    }

    /***********************************************************
     自定义的方法
     ***********************************************************/

    static isUndefined(arg) {
        return typeof(arg) === 'undefined';
    }

    /**
     * 检查 item 是否在 arr 中，如果在则返回，如果不在返回 defaultVal
     *
     * @param str 待检查元素，如果不是字符串，则返回defaultVal
     * @param arr 元素数据
     * @param defaultStr 默认值
     * @returns {*}
     */
    static checkStringOrUseDefault(str, arr, defaultStr) {
        if (dataUtil.isUndefined(str)) return defaultStr;

        let i;
        for (i = 0; i < arr.length; i++) {
            if (arr[i] === str) return str;
        }
        return defaultStr;
    }

    /**
     * 检查 num 是否为数字，并检查其范围是否在 [min, max] 。
     * 暂时有点小bug。
     *
     * @param num 要检查的值
     * @param defaultVal 默认值
     * @param min 最小值，元素如果 < min，则返回 defaultVal
     * @param max 最大值，元素如果 > max，则返回 defaultVal
     * @returns {*}
     */
    static checkNumberOrUseDefault(num, defaultVal, min, max) {
        if (dataUtil.isUndefined(num)) return defaultVal;
        if (typeof(num) === "string" && isNaN(parseInt(num))) {
            return defaultVal;
        }
        let n = parseInt(num);
        if ((dataUtil.isNumber(min) && n < min) || (dataUtil.isNumber(max) && max > n)) return defaultVal;
        return n;
    }

    /**
     * 检查字符串是否有长度
     *
     * @param item 字符串
     * @returns {boolean}
     */
    static hasLength(item) {
        return dataUtil.isString(item) && item.trim().length > 0;
    }

    /**
     * 对传入的字符串进行处理。去除首尾的空白字符
     *
     * @param item
     * @returns {string}
     */
    static getPureString(item) {
        return (dataUtil.isString(item) && item.trim().length > 0) ? item.trim() : '';
    }

    /**
     * 判断字符串是否相等
     *
     * @param s1
     * @param s2
     * @returns {boolean}
     */
    static isStrEquals(s1, s2) {
        if (dataUtil.isUndefined(s1) || dataUtil.isUndefined(s2)) return false;
        return s1 === s2;
    }

    static isEmptyObj(obj) {
        return !dataUtil.isUndefined(obj) && dataUtil.isObject(obj) && JSON.stringify(obj) === '{}';
    }

    static isEmptyArray(arr) {
        return !dataUtil.isUndefined(arr) && dataUtil.isArray(arr) && JSON.stringify(arr) === '[]';
    }

    /**
     * 递归得到 obj 字符串
     *
     * @param obj
     * @returns {*}
     */
    static obj2String(obj) {
        if (!isObject(obj)) return obj;
        let key;
        let property = "{\n";
        for (let item in obj) {
            key = dataUtil.obj2String(obj[item]);
            property += item + ">" + typeof  key + "<: " + key + " , \n";
        }
        property += " }";
        return property;
    }
}

module.exports = dataUtil

