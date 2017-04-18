import React, { Component, PropTypes } from 'react';
import { NavigationActions, DrawerNavigator, StackNavigator } from 'react-navigation';

import LoginScreen from './LoginScreen';
import HomeScreen from './HomeScreen';
import MyShareScreen from './MyShareScreen';
import ProfileScreen from './ProfileScreen';

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

const MainNavigator = DrawerNavigator({
  Shares: {
    screen: HomeScreen,
  },
  MyShare: {
    screen: MyShareScreen,
  },
  Profile: {
    screen: ProfileScreen,
  },
}, {
  contentComponent: props => <Drawer {...props} drawers={drawers} />,
  contentOptions: {

  },
  navigationOptions: {
    headerVisible: false,
  }
});

class Main extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <MainNavigator screenProps={{
      redirectLogin: (cb) => {
        const resetAction = NavigationActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({ routeName: 'Login', params: {cb} }),
          ],
        });
        this.props.navigation.dispatch(resetAction);
      },
      redirectHome: (cb) => {
        const resetAction = NavigationActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({ routeName: 'Shares', params: {cb} }),
          ],
        });
        this.props.navigation.dispatch(resetAction);
      }
    }} />
  }
}

const TopNavigator = StackNavigator({
  Main: {
    screen: Main,
  },
  Login: {
    screen: LoginScreen,
  }
}, {
  mode: 'modal',
  navigationOptions: {
    headerVisible: false,
    cardStack: {
      gesturesEnabled: false,
    },
  },
});

export default TopNavigator;
