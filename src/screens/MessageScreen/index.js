import React, { Component, PropTypes } from 'react';
import { StackNavigator } from 'react-navigation';

import MessageListScreen from './MessageListScreen';
import ChatScreen from './ChatScreen';

const MessageScreen = StackNavigator({
  ShareList: {
    screen: MessageListScreen,
  },
  ChatScreen: {
    screen: ChatScreen,
  },
}, {
  headerMode: 'screen',
  navigationOptions: {
    header: {
      visible: false
    }
  }
});

export default MessageScreen;
