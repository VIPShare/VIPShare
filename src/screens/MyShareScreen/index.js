import React, { Component, PropTypes } from 'react';
import { StackNavigator } from 'react-navigation';

import MyShareListScreen from './MyShareListScreen';

const MyShare = StackNavigator({
  MyShareList: {
    screen: MyShareListScreen,
  },
}, {
  headerMode: 'screen',
  navigationOptions: {
    headerVisible: false
  }
});

MyShare.navigationOptions = {
  drawerLabel: 'MyShare',
  drawerIcon: ({ tintColor }) => <Icon name="share" />,
}

export default MyShare;
