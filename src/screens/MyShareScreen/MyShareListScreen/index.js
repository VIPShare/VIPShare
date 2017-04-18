import React, { Component, PropTypes } from 'react';
import { NavigationActions } from 'react-navigation';
import { Icon } from 'react-native-elements';

import Shares from '../../../components/Shares';

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
          action: NavigationActions.navigate({ routeName: 'Shares'}),
        });
        navigation.dispatch(homeAction);
      }} />,
      headerRight: <Icon name="add" containerStyle={styles.nav.rightWrapper} onPress={() => {
        navigate('ShareAdd');
      }} />,
      headerVisible: true,
    }
  }

  constructor(props) {
    super(props);

    this.state = {
      accounts: [],
      loading: true,
      loadSuccess: true,
    }
  }

  render() {
    return (
      <Shares
        loading={this.state.loading}
        loadSuccess={this.state.loadSuccess}
        accounts={this.state.accounts}
        dataSource={this.state.dataSource}
        loadingTip={{
          tip: '请稍后',
          subTip: '正在加载我的分享...',
        }}
        loadFailTip={{
          tip: '加载失败',
          subTip: '很抱歉，加载我的分享失败',
        }}
        emptyTip={{
          tip: '还未有人分享哦！',
          subTip: '点击右上角Add按钮，加入分享者的队列吧！',
        }}
      />
    );
  }
}

export default MyShareList;
