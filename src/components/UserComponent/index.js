import React, { Component, PropTypes } from 'react';
import { Navigation } from 'react-native-navigation';
import { AsyncStorage,Text } from 'react-native';

class UserComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLogin: false,
    }
    
    if (!global.loginNow) {
      global.loginNow = true;
      return;
    }
    this.checkAuth();
  }

  async checkAuth() {
    console.log('check auth')
    const isLogin = await AsyncStorage.getItem('isLogin');
    if (isLogin) {
      return true;
    }

    Navigation.showModal({
      screen: 'app.login',
      title: '登录',
      passProps: {
        cb: () => {
          this.setState({
            isLogin: true,
          });
          global.loginNow = false;
        },
      },
      animationType: 'slide-up',
    });
  }

  render() {
    if (!this.state.isLogin) {
      return false;
    }
    
    const Comp = this.props.component;
    return <Comp {...this.props} />;
  }

}

export default UserComponent;
