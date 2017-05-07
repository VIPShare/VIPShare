import { AsyncStorage } from 'react-native';
import { NavigationActions } from 'react-navigation';

let isLogin = false;
let eventGroup = [];

const eventGroupTrigger = () => {
  eventGroup.forEach(evt => {
    evt && 'function' === typeof evt && evt();
  });
}

export const userRequiredAndDispatch = async (redirectLogin, cb) => {
  redirectLogin(cb);
}

export const checkAuth = async (redirectLogin, err, cb) => {
  if (err.status === 401) {
    // 在近乎同一时刻进行登录请求竞争，选择第一个获胜者，将其余请求者的回调请求置入事件队列，当登录成功后，完成队列里的事件执行
    eventGroup.push(cb);
    if (isLogin) {
      return err;
    }
    isLogin = false;
    await userRequiredAndDispatch(redirectLogin, eventGroupTrigger);
  }
  return isLogin;
}

export const isLoginin = async () => {
  const access_token = await AsyncStorage.getItem('access_token');
  if ('string' === typeof access_token) {
    return true;
  }
  return false;
}
