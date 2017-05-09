import React, { Component, PropTypes } from 'react';
import { NavigationActions, DrawerNavigator, StackNavigator } from 'react-navigation';

import LoginScreen from './LoginScreen';
import HomeScreen from './HomeScreen';
import MyShareScreen from './MyShareScreen';
import ProfileScreen from './ProfileScreen';
import ShareAddScreen, { ShareTypeScreen } from './ShareAddScreen';
import ChatScreen from './ChatScreen';

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

const StackNavigatorWrapper = (key, Comp) => {
  const Wrapper = StackNavigator({
    [key]: {
      screen: Comp,
    }
  });
  return Wrapper;
}

const MainNavigator = DrawerNavigator({
  Shares: {
    screen: StackNavigatorWrapper('Shares', HomeScreen),
  },
  MyShare: {
    screen: StackNavigatorWrapper('MyShare', MyShareScreen),
  },
  Profile: {
    screen: StackNavigatorWrapper('Profile', ProfileScreen),
  },
}, {
  contentComponent: props => <Drawer {...props} drawers={drawers} />,
  contentOptions: {

  },
  headerMode: 'screen',
  navigationOptions: {
    header: null,
  }
});

class Main extends Component {
  static navigationOptions = {
    header: null,
  }

  constructor(props) {
    super(props);

    this.redirectAction = this.redirectAction.bind(this);
  }

  redirectAction(action) {
    this.props.navigation.dispatch(action);
  }

  render() {
    return <MainNavigator screenProps={{
      redirectLogin: (cb) => {
        const resetAction = NavigationActions.navigate({
          routeName: 'Login',
          params: {cb},
        });
        this.redirectAction(resetAction);
      },
      redirect: this.redirectAction,
    }} />
  }
}

const TopNavigator = StackNavigator({
  Main: {
    screen: Main,
  },
  Login: {
    screen: LoginScreen,
  },
  ShareAdd: {
    screen: ShareAddScreen,
  },
  ShareType: {
    screen: ShareTypeScreen,
  },
  Chat: {
    screen: ChatScreen,
  },
}, {
  mode: 'modal',
  navigationOptions: {
    gesturesEnabled: false,
  },
});

export default TopNavigator;
