// import { Navigation } from 'react-native-navigation';
// import { AsyncStorage } from 'react-native';

// export const userRequired = async () => {
//   const access_token = await AsyncStorage.getItem('access_token');
//   if (!access_token) {
//     return false;
//   }
//   return true;
// }

let isLogin = false;
let eventGroup = [];

const eventGroupTrigger = () => {
  eventGroup.forEach(evt => {
    evt && 'function' === typeof evt && evt();
  });
}

export const userRequiredAndDispatch = async (cb) => {
  // Navigation.showModal({
  //   screen: 'app.login',
  //   title: '登录',
  //   passProps: {
  //     cb,
  //   },
  //   animationType: 'slide-up',
  // });
}

export const checkAuth = async (err, cb) => {
  if (err.status === 401) {
    // 在近乎同一时刻进行登录请求竞争，选择第一个获胜者，将其余请求者的回调请求置入事件队列，当登录成功后，完成队列里的事件执行
    eventGroup.push(cb);
    if (isLogin) {
      return err;
    }
    isLogin = false;
    await userRequiredAndDispatch(eventGroupTrigger);
  }
  return err;
}
