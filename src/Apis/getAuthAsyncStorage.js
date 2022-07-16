import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getAuthAsyncStorage() {
  const token = await AsyncStorage.getItem('userToken');
  const user = await AsyncStorage.getItem('userData');
  return {
    token,
    user: JSON.parse(user),
  };
}

export async function setAuthAsyncStorage(response) {
  console.log(response.access_token);
  await AsyncStorage.setItem('userToken', response.access_token);
  await AsyncStorage.setItem('userData', JSON.stringify(response));
}

export async function resetAuthAsyncStorage() {
  await AsyncStorage.removeItem('userData');
  await AsyncStorage.removeItem('userToken');
}
