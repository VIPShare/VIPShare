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

    this.renderLeftButton = this.renderLeftButton.bind(this);
    this.renderRightButton = this.renderRightButton.bind(this);
    this.renderTitle = this.renderTitle.bind(this);
  }

  renderLeftButton(route, navigator, index, navState) {
    if (route.LeftButton) {
      return route.LeftButton;
    }
    if (index === 0) {
      return null;
    }
    return <Icon name="keyboard-arrow-left" onPress={ () => navigator.pop() } />;
  }

  renderRightButton(route, navigator, index, navState) {
    if (route.RightButton) {
      return route.RightButton;
    }
    return null;
  }

  renderTitle(route, navigator, index, navState) {
    if (route.renderTitle) {
      return route.renderTitle();
    }
    if (route.title) {
      return <Text>{ route.title }</Text>;
    }
    return null;
  }

  render() {
    return (
      <Navigator
        initialRoute={ defaultScreen }
        initialRouteStack={ [defaultScreen] }
        renderScene={ (route, navigator) => route.renderScreen(navigator, route) }
        navigationBar={
          <Navigator.NavigationBar
            routeMapper={{
              LeftButton: this.renderLeftButton,
              RightButton: this.renderRightButton,
              Title: this.renderTitle,
            }}
            style={{backgroundColor: 'gray'}}
          />
        }
      />
    );
  }
}

export default App;
