import React, { Component, PropTypes } from 'react';
import { Navigator, Text } from 'react-native';
import Config from 'react-native-config';
import { Icon } from 'react-native-elements';
import '../ReactotronConfig';  // dev listener

// set env
if (Config.DEV) {
  console.log('dev')
}

// screen related book keeping
import { routes, defaultScreen } from './screens';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Navigator
        initialRoute={ defaultScreen }
        initialRouteStack={ [defaultScreen] }
        renderScene={ (route, navigator) => route.renderScreen(navigator, route) }
      />
    );
  }
}

export default App;
