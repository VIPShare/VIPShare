import React, { Component, PropTypes } from 'react';
import { Text } from 'react-native';
import { Grid, Row } from 'react-native-elements';

import Navigator from '../components/Navigator';

import LoginScreen from './LoginScreen';
import HomeScreen from './HomeScreen';
import ShareAddScreen, { ShareTypeScreen } from './ShareAddScreen';
import ChatScreen from './ChatScreen';

const wrapNavigator = (navigator, leftButton, rightButton, title) => {
  if (!navigator) {
    throw new Error('There is no navigator found.');
  }

  const findRoute = (screen, state) => {
    let screenRoute = routes.filter(route => route.screen === screen);
    if (screenRoute.length === 0) {
      throw new Error(`There is no screen named ${screen}`);
    }
    return {
      ...screenRoute[0],
      routeState: state,
    };
  }

  navigator.pushScreen = (screen, state) => {
    navigator.push(findRoute(screen, state));
  }
  navigator.resetToScreen = (screen, state) => {
    navigator.resetTo(findRoute(screen, state));
  }
  navigator.setLeftButton = leftButton;
  navigator.setRightButton = rightButton;
  navigator.setTitle = title;

  return navigator;
}

class WrappedScreen extends Component {
  static propTypes = {
    navigator: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      leftButton: undefined,
      rightButton: undefined,
      title: undefined,
    }

    this.setLeftButton = this.setLeftButton.bind(this);
    this.setRightButton = this.setRightButton.bind(this);
    this.setTitle = this.setTitle.bind(this);
  }

  setLeftButton(leftButton) {
    if (leftButton && leftButton === this.state.leftButton) {
      return false;
    }
    console.log('setLeftButton')
    this.setState({
      leftButton,
    });
  }

  setRightButton(rightButton) {
    if (rightButton && rightButton === this.state.rightButton) {
      return false;
    }
    console.log('setRightButton')
    this.setState({
      rightButton,
    });
  }

  setTitle(title) {
    if (title === this.state.title) {
      return false;
    }
    console.log('setTitle')
    this.setState({
      title,
    });
  }

  render() {
    let navigator = this.props.navigator;
    const { comp, route } = this.props;
    const { leftButton, rightButton, title } = this.state;
    const t = 'undefined' === typeof title ? route.title : title;
    const l = 'undefined' === typeof leftButton ? comp.LeftButton : leftButton;
    const r = 'undefined' === typeof rightButton ? comp.RightButton : rightButton;
    navigator = wrapNavigator(navigator, this.setLeftButton, this.setRightButton, this.setTitle);
    return (
      <Grid>
        <Navigator {...route.routeState} navigator={ navigator } route={ route } leftButton={ l } rightButton={ r } title={ t } />
        <Row>
        {
          React.createElement(comp, {
            ...route.routeState,
            navigator,
            route,
          })
        }
        </Row>
      </Grid>
    );
  }
}

const renderRoute = (screen, title, Comp) => {
  return {
    screen,
    title,
    renderScreen: (navigator, route) => <WrappedScreen navigator={ navigator } route={ route } comp={ Comp } />,
  }
}

const routes = [
  renderRoute('app.login', 'Login', LoginScreen),
  renderRoute('app.home', 'Home', HomeScreen),
  renderRoute('app.shareAdd', 'ShareAdd', ShareAddScreen),
  renderRoute('app.chat', 'Chat with', ChatScreen),

  renderRoute('shareAdd.typeChoose', null, ShareTypeScreen),
]

const defaultScreen = routes[1];

export {
  routes,
  defaultScreen,
}
