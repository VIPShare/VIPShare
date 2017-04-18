import React, { Component, PropTypes } from 'react';
import { StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

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
    headerVisible: false
  }
});

MessageScreen.navigationOptions = {
  tabBarLabel: 'Message',
  tabBarIcon: ({ tintColor }) => <Icon name="message" color={ tintColor } />,
}

export default MessageScreen;
