import React, { Component, PropTypes } from 'react';
import { StackNavigator } from 'react-navigation';

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
      header: {
          visible: false
      }
  }
});

export default ShareScreen;
