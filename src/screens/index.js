import React, { Component, PropTypes } from 'react';
import { Text } from 'react-native';
import { Grid, Row } from 'react-native-elements';

import Navigator, { DefaultNav } from '../components/Navigator';
import LoginScreen from './LoginScreen';
import HomeScreen from './HomeScreen';
import ShareAddScreen, { ShareTypeScreen } from './ShareAddScreen';
import ChatScreen from './ChatScreen';

const wrapNavigator = (navigator) => {
  if (!navigator) {
    throw new Error('There is no navigator found.');
  }

  const findRoute = (screen, state) => {
    let screenRoute = routes.filter(route => route.screen === screen);
    if (screenRoute.length === 0) {
      throw new Error(`There is no screen named ${screen}`);
    }
    return {
      ...screenRoute[0],
      routeState: state,
    };
  }

  navigator.pushScreen = (screen, state) => {
    navigator.push(findRoute(screen, state));
  }
  navigator.resetToScreen = (screen, state) => {
    navigator.resetTo(findRoute(screen, state));
  }

  return navigator;
}

const renderScreen = (navigator, route, Comp) => {
  navigator = wrapNavigator(navigator);
  return (
    <Grid>
      {
        (Comp.LeftButton || Comp.RightButton || route.title) ?
        <Navigator {...route.routeState} navigator={ navigator } route={ route } leftButton={ Comp.LeftButton } rightButton={ Comp.RightButton } title={ Comp.title || route.title } />
        :
        <DefaultNav {...route.routeState} navigator={ navigator } route={ route } />
      }
      <Row>
        <Comp {...route.routeState} navigator={ navigator } route={ route } />
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
