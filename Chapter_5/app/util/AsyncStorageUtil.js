import { AsyncStorage } from 'react-native';
/**
 * 持久存储工具
 */

var AsyncStorageUtil = {
    setValue: function (key, value, callBcak) {
        if (value) {
            return AsyncStorage.setItem(key, value, (error) => callBcak(error));
        }
    },
    setValues: function (multiParis, callBcak) {
        if (multiParis) {
            return AsyncStorage.multiSet(multiParis, (errors) => callBcak(errors));
        }
    },
    getValue: function (key, callBcak) {

        return AsyncStorage.getItem(key, (error, result) => callBcak(error, result));
    },
    removeValue: function (key, callBcak) {

        return AsyncStorage.removeItem(key, (error) => callBcak(error));
    }
}

export default AsyncStorageUtil;
