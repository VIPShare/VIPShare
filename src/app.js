import React, { Component, PropTypes } from 'react';
import { Text } from 'react-native';
import Config from 'react-native-config';
import { Icon } from 'react-native-elements';
import { DrawerNavigator } from 'react-navigation';
import '../ReactotronConfig';  // dev listener

import AppNavigator from './screens';

// set env
if (Config.DEV) {
  console.log('dev')
}

export default AppNavigator;
