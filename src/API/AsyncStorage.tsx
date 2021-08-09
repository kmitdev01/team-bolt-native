import AsyncStorage from '@react-native-async-storage/async-storage';


export const storeData = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value)
    } catch (e) {
        console.log(e, "err")
    }
}


export const getData = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key)
        console.log(value, "get key")
        if (value !== null) {
            // value previously stored
            return value
        }
    } catch (e) {
        console.log(e, "err")
    }
}
