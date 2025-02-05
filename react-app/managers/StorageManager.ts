import AsyncStorage from '@react-native-async-storage/async-storage';

export const vault = {
  set: async (value: any, key: string): Promise<void> => {
    try {
      const stringValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, stringValue);
    } catch (error) {
      console.error('Error saving value:', error);
    }
  },

  get: async (key: string): Promise<any | null> => {
    try {
      const stringValue = await AsyncStorage.getItem(key);
      return stringValue ? JSON.parse(stringValue) : null;
    } catch (error) {
      console.error('Error retrieving value:', error);
      return null;
    }
  },

  delete: async (key: string): Promise<void> => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error('Error deleting value:', error);
    }
  },
};
