import React, { Component, PropTypes } from 'react';
import { DrawerNavigator } from 'react-navigation';

import LoginScreen from './LoginScreen';
import HomeScreen from './HomeScreen';
import MyShareScreen from './MyShareScreen';
import ProfileScreen from './ProfileScreen';

import Drawer from '../components/Drawer';

const drawers = {
  MyShare: {
    label: '我的分享',
    icon: 'share',
  },
  Profile: {
    label: '个人资料',
    icon: 'perm-identity',
  }
};

export default DrawerNavigator({
  Shares: {
    screen: HomeScreen,
  },
  MyShare: {
    screen: MyShareScreen,
  },
  Profile: {
    screen: ProfileScreen,
  },
}, {
  contentComponent: props => <Drawer {...props} drawers={drawers} />,
  contentOptions: {

  }
});
