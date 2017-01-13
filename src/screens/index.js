import React, { Component, PropTypes } from 'react';
import { Navigation } from 'react-native-navigation';

import LoginScreen from './LoginScreen';
import DrawerScreen from './DrawerScreen';
import UserComponent from '../components/UserComponent';
import ShareListScreen from './ShareListScreen';
import ShareAddScreen, { ShareTypeScreen } from './ShareAddScreen';
import MessageScreen from './MessageScreen';
import ChatScreen from './ChatScreen';

global.loginNow = false;

const wrapAuth = (component) => {
  class WrapedComponent extends Component {
    render() {
      return <UserComponent {...this.props} component={ component } />
    }
  }
  return WrapedComponent;
}

export function registerScreens() {
  Navigation.registerComponent('app.login', () => LoginScreen);
  Navigation.registerComponent('app.shareList', () => wrapAuth(ShareListScreen));
  Navigation.registerComponent('app.shareAdd', () => ShareAddScreen);
  Navigation.registerComponent('app.message', () => wrapAuth(MessageScreen));
  Navigation.registerComponent('app.chat', () => ChatScreen);
  Navigation.registerComponent('app.SideMenu', () => DrawerScreen);


  Navigation.registerComponent('shareAdd.typeChoose', () => ShareTypeScreen);

}
