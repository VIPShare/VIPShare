import React, { Component, PropTypes } from 'react';
import { TabNavigator, DrawerNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import ShareScreen from '../ShareScreen';
import MessageScreen from '../MessageScreen';

const Home = TabNavigator({
  Share: {
    screen: ShareScreen,
  },
  Message: {
    screen: MessageScreen,
  },
}, {
  tabBarPosition: 'bottom',
  animationEnabled: true,
  swipeEnabled: true,
  activeTintColor: 'blue',

  // ios

  // android
  upperCaseLabel: false,
  tabBarOptions: {
    showIcon: true,
  },
  indicatorStyle: {
    with: 0,
  },
});

export default Home;
