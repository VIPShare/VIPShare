import React, { Component } from 'react';
import {
  ListView,
  Alert,
  DeviceEventEmitter,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { NavigationActions, StackNavigator } from 'react-navigation';

import Page from '../../components/Page';
import Shares from '../../components/Shares';
import { list } from '../../services/account';
import { checkAuth, isLoginin } from '../../utils/permission';

import styles from './index.style';

class ShareListScreen extends Component {
  static navigationOptions = ({ navigation, screenProps }) => {
    const { state, setParams, navigate } = navigation;
    return {
      title: 'Shares',
      headerLeft: <Icon name="view-headline" containerStyle={styles.nav.leftWrapper} onPress={async () => {
        if (await isLoginin()) {
          navigate('DrawerOpen');
        } else {
          screenProps.redirectLogin();
        }
      }} />,
      headerRight: <Icon name="add" containerStyle={styles.nav.rightWrapper} onPress={() => {
        screenProps.redirect(NavigationActions.navigate({
          routeName: 'ShareAdd',
        }));
      }} />,
      headerVisible: true,

      tabBarLabel: 'Shares',
      tabBarIcon: ({ tintColor }) => <Icon name="share" iconStyle={{ color: tintColor }} />,
    }
  }

  constructor(props) {
    super(props);

    this.state = {
      accounts: [],
      loading: true,
      loadSuccess: true,
    }

    this.init = this.init.bind(this);
    this.fetchData = this.fetchData.bind(this);
  }

  componentDidMount() {
    this.subscription = DeviceEventEmitter.addListener('ShareRefresh', this.init);
  }

  componentWillUnmount() {
    if (this.loading) {
      clearTimeout(this.loading);
    }
    if (this.subscription) {
      this.subscription.remove();
    }
  }

  async init() {
    this.fetchData();
  }

  fetchData() {
    this.loading = setTimeout(async () => {
      const { data, err } = await list();
      if (err) {
        this.setState({
          loading: false,
          loadSuccess: false,
        })
        return false;
      }
      this.setState({
        accounts: data,
        loading: false,
        loadSuccess: true,
      })
    }, 100);
  }

  render() {
    return (
      <Page
        {...this.props}
        init={this.init}
        loading={this.state.loading}
      >
        <Shares
          screenProps={this.props.screenProps}
          loading={this.state.loading}
          loadSuccess={this.state.loadSuccess}
          accounts={this.state.accounts}
          loadFailTip={{
            tip: '加载失败',
            subTip: '很抱歉，加载账号分享列表失败',
          }}
          emptyTip={{
            tip: '还未有人分享哦！',
            subTip: '点击右上角Add按钮，成为第一个分享者吧！',
          }}
          onRefresh={this.init}
        />
      </Page>
    );
  }
}

const ShareListStack = StackNavigator({
  ShareList: {
    screen: ShareListScreen,
  },
});

export default ShareListStack;
