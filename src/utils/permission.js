import { AsyncStorage } from 'react-native';

export const userRequired = async () => {
  const access_token = await AsyncStorage.getItem('access_token');
  if (!access_token) {
    return false;
  }
  return true;
}

export const userRequiredAndDispatch = async (navigator) => {
  const access_token = await userRequired();
  if (!access_token) {
    navigator.showModal({
      screen: 'app.login',
      title: '登录',
      animationType: 'slide-up',
    })
  }
}
