import React, { Component, PropTypes } from 'react';
import { Text } from 'react-native';
import LoginScreen from './LoginScreen';
import HomeScreen from './HomeScreen';
// import ShareListScreen from './ShareListScreen';
import ShareAddScreen, { ShareTypeScreen } from './ShareAddScreen';
// import MessageScreen from './MessageScreen';
import ChatScreen from './ChatScreen';

const renderRoute = (screen, title, Comp) => {
  return {
    screen,
    title,
    renderScreen: (navigator, route) => <Comp navigator={ navigator } route={ route } />,
    LeftButton: Comp.LeftButton,
    RightButton: Comp.RightButton,
    Title: Comp.Title,
  }
}

const routes = [
  renderRoute('app.login', '登录', LoginScreen),
  renderRoute('app.home', null, HomeScreen),
  renderRoute('app.shareAdd', 'ShareAdd', ShareAddScreen),
  renderRoute('app.chat', null, ChatScreen),

  renderRoute('shareAdd.typeChoose', null, ShareTypeScreen),
]

const defaultScreen = routes[1];

export {
  routes,
  defaultScreen,
}
