import { Navigation } from 'react-native-navigation';
// import { AsyncStorage } from 'react-native';

// export const userRequired = async () => {
//   const access_token = await AsyncStorage.getItem('access_token');
//   if (!access_token) {
//     return false;
//   }
//   return true;
// }

export const userRequiredAndDispatch = async (cb) => {
  Navigation.showModal({
    screen: 'app.login',
    title: '登录',
    passProps: {
      cb,
    },
    animationType: 'slide-up',
  });
}

export const checkAuth = async (err, cb) => {
  if (err.status === 401) {
    await userRequiredAndDispatch(cb);
  }
  return err;
}
