import React, { Component, PropTypes } from 'react';
import { Navigation } from 'react-native-navigation';

import LoginScreen from './LoginScreen';
import DrawerScreen from './DrawerScreen';
import ShareListScreen from './ShareListScreen';
import ShareAddScreen, { ShareTypeScreen } from './ShareAddScreen';
import MessageScreen from './MessageScreen';
import ChatScreen from './ChatScreen';

export function registerScreens() {
  Navigation.registerComponent('app.login', () => LoginScreen);
  Navigation.registerComponent('app.shareList', () => ShareListScreen);
  Navigation.registerComponent('app.shareAdd', () => ShareAddScreen);
  Navigation.registerComponent('app.message', () => MessageScreen);
  Navigation.registerComponent('app.chat', () => ChatScreen);
  Navigation.registerComponent('app.SideMenu', () => DrawerScreen);


  Navigation.registerComponent('shareAdd.typeChoose', () => ShareTypeScreen);

}
