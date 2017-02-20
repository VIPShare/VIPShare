import React, { Component, PropTypes } from 'react';
import { Text } from 'react-native';
import { Grid, Row } from 'react-native-elements';

import Navigator from '../components/Navigator';
import LoginScreen from './LoginScreen';
import HomeScreen from './HomeScreen';
import ShareAddScreen, { ShareTypeScreen } from './ShareAddScreen';
import ChatScreen from './ChatScreen';

const renderScreen = (navigator, route, Comp) => {
  return (
    <Grid>
      <Row style={ {height: 60,backgroundColor: 'gray'} }>
      {
        (Comp.LeftButton || Comp.RightButton || route.title) ?
        <Navigator leftButton={ Comp.LeftButton } rightButton={ Comp.RightButton } title={ Comp.title || route.title } />
        :
        false
      }
      </Row>
      <Row>
        <Comp navigator={ navigator } route={ route } />
      </Row>
    </Grid>
  );
}

const renderRoute = (screen, title, Comp) => {
  return {
    screen,
    title,
    renderScreen: (navigator, route) => renderScreen(navigator, route, Comp),
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
console.log(defaultScreen)
export {
  routes,
  defaultScreen,
}
