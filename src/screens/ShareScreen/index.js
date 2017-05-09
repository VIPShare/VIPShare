import React, { Component } from 'react';
import {
  ListView,
  Alert,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { NavigationActions, StackNavigator } from 'react-navigation';

import Page from '../../components/Page';
import Shares from '../../components/Shares';
import { list } from '../../services/account';
import { checkAuth } from '../../utils/permission';

import styles from './index.style';

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
class ShareListScreen extends Component {
  static navigationOptions = ({ navigation, screenProps }) => {
    const { state, setParams, navigate } = navigation;
    return {
      title: 'Shares',
      headerLeft: <Icon name="view-headline" containerStyle={styles.nav.leftWrapper} onPress={() => {
        navigate('DrawerOpen');
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

  componentWillUnmount() {
    if (this.loading) {
      clearTimeout(this.loading);
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
        dataSource: ds.cloneWithRows(data),
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
          loading={this.state.loading}
          loadSuccess={this.state.loadSuccess}
          accounts={this.state.accounts}
          dataSource={this.state.dataSource}
          loadingTip={{
            tip: '请稍后',
            subTip: '正在加载账号分享列表...',
          }}
          loadFailTip={{
            tip: '加载失败',
            subTip: '很抱歉，加载账号分享列表失败',
          }}
          emptyTip={{
            tip: '还未有人分享哦！',
            subTip: '点击右上角Add按钮，成为第一个分享者吧！',
          }}
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
