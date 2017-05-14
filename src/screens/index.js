import React, { Component, PropTypes } from 'react';
import { NavigationActions, DrawerNavigator, StackNavigator } from 'react-navigation';

import LoginScreen from './LoginScreen';
import SignupScreen from './SignupScreen';
import HomeScreen from './HomeScreen';
import MyShareScreen from './MyShareScreen';
import ProfileScreen from './ProfileScreen';
import { SexChooseScreen } from './ProfileScreen/ProfileUpdateScreen';
import ShareAddScreen, { ShareTypeScreen } from './ShareAddScreen';
import ChatScreen from './ChatScreen';
import SettingScreen from './SettingScreen';

import Drawer from '../components/Drawer';

const drawers = {
  MyShare: {
    label: '我的分享',
    icon: 'share',
  },
  Profile: {
    label: '个人资料',
    icon: 'perm-identity',
  },
  Setting: {
    label: '设置',
    icon: 'settings',
  },
};

const StackNavigatorWrapper = (key, Comp) => {
  const Wrapper = StackNavigator({
    [key]: {
      screen: Comp,
    }
  });
  return Wrapper;
}

const redirectAction = (navigation, action) => {
  navigation.dispatch(action);
}

const screenProps = (navigation) => {
  return {
    redirectLogin: (cb) => {
      const resetAction = NavigationActions.navigate({
        routeName: 'Login',
        params: { cb },
      });
      redirectAction(navigation, resetAction);
    },
    redirect: (action) => {
      redirectAction(navigation, action);
    },
  }
}

const MainNavigator = DrawerNavigator({
  Shares: {
    screen: HomeScreen,
  },
  MyShare: {
    screen: StackNavigatorWrapper('MyShare', MyShareScreen),
  },
  Profile: {
    screen: ProfileScreen,
  },
  Setting: {
    screen: StackNavigatorWrapper('Setting', SettingScreen),
  },
}, {
    contentComponent: props => <Drawer {...props} drawers={drawers} />,
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
  }

  render() {
    return <MainNavigator screenProps={screenProps(this.props.navigation)} />
  }
}

const TopNavigator = StackNavigator({
  Main: {
    screen: Main,
  },
  Login: {
    screen: LoginScreen,
  },
  Signup: {
    screen: SignupScreen,
  },
  ShareAdd: {
    screen: ShareAddScreen,
  },
  ShareType: {
    screen: ShareTypeScreen,
  },
  SexChoose: {
    screen: SexChooseScreen,
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
