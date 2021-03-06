import React, { Component, PropTypes } from 'react';
import { ListView, DeviceEventEmitter } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { Icon } from 'react-native-elements';

import Page from '../../components/Page';
import Shares from '../../components/Shares';
import { list } from '../../services/myaccount';

import styles from './index.style';

class MyShareList extends Component {
  static navigationOptions = (props) => {
    const { navigation, screenProps } = props;
    const { state, setParams, navigate } = navigation;
    return {
      title: 'My Shares',
      headerLeft: <Icon name="keyboard-arrow-left" containerStyle={styles.nav.leftWrapper} onPress={() => {
        const homeAction = NavigationActions.navigate({
          routeName: 'Main',
          action: NavigationActions.navigate({ routeName: 'Shares' }),
        });
        navigation.dispatch(homeAction);
      }} />,
      headerRight: <Icon name="add" containerStyle={styles.nav.rightWrapper} onPress={() => {
        screenProps.redirect(NavigationActions.navigate({
          routeName: 'ShareAdd',
        }));
      }} />,
      header: undefined,

      drawerLabel: 'MyShare',
      drawerIcon: ({ tintColor }) => <Icon name="share" />,
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

  init() {
    this.fetchData();
  }

  fetchData() {
    this.loading = setTimeout(async () => {
      const { data, err } = await list();
      if (err) {
        this.setState({
          loading: false,
          loadSuccess: false,
        });
        return false;
      }
      this.setState({
        accounts: data,
        loading: false,
        loadSuccess: true,
      });
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
            subTip: '很抱歉，加载我的分享失败',
          }}
          emptyTip={{
            tip: '还未有人分享哦！',
            subTip: '点击右上角Add按钮，加入分享者的队列吧！',
          }}
          onRefresh={this.init}
        />
      </Page>
    );
  }
}

export default MyShareList;
