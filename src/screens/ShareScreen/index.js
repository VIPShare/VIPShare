import React, { Component, PropTypes } from 'react';
import { StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import ShareListScreen from './ShareListScreen';
import ShareAddScreen, { ShareTypeScreen } from './ShareAddScreen';

const ShareScreen = StackNavigator({
  ShareList: {
    screen: ShareListScreen,
  },
  ShareAdd: {
    screen: ShareAddScreen,
  },
  ShareType: {
    screen: ShareTypeScreen,
  },
}, {
  headerMode: 'screen',
  navigationOptions: {
    headerVisible: false
  }
});

ShareScreen.navigationOptions = {
  tabBarLabel: 'Shares',
  tabBarIcon: ({ tintColor }) => <Icon name="share" color={tintColor} />,
}

export default ShareScreen;
