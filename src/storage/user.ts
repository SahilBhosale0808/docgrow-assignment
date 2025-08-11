import AsyncStorage from '@react-native-async-storage/async-storage';
const KEY = 'docgrow:userName';
export async function getUserName() {
  return (await AsyncStorage.getItem(KEY)) || '';
}
export async function setUserName(name: string) {
  await AsyncStorage.setItem(KEY, name);
}
