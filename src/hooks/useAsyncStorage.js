import AsyncStorage from '@react-native-async-storage/async-storage';

const useAsyncStorage = () => {
  const store = async (key, value) => {
    try {
      const res = await AsyncStorage.setItem(key, value)
      return res
    } catch (e) {
      return e
    }
  }

  const get = async (key) => {
    try {
      const data = await AsyncStorage.getItem(key)
      
      return data
    } catch (e) {
      return e
    }
  }

  return {store, get}
}

export default useAsyncStorage