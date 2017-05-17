import React, { Component } from 'react';
import {
  ListView,
} from 'react-native';
import { List, ListItem, Icon } from 'react-native-elements';
import { NavigationActions, StackNavigator } from 'react-navigation';

import Page from '../../components/Page';
import { FlatLists } from '../../components/Lists';

import { list } from '../../services/user';
import { isLoginin } from '../../utils/permission';

import styles from './index.style';

class MessageScreen extends Component {
  static navigationOptions = ({ navigation, screenProps }) => {
    const { navigate } = navigation;
    return {
      title: 'Message',
      headerLeft: <Icon name="view-headline" containerStyle={styles.nav.leftWrapper} onPress={async () => {
        if (await isLoginin()) {
          navigate('DrawerOpen');
        } else {
          screenProps.redirectLogin();
        }
      }} />,
      headerRight: false,

      tabBarLabel: 'Message',
      tabBarIcon: ({ tintColor }) => <Icon name="message" iconStyle={{ color: tintColor }} />,
    }
  }

  constructor(props) {
    super(props);

    this.state = {
      users: [],
      loading: true,
      loadSuccess: false,
    };

    this.init = this.init.bind(this);
    this.onChat = this.onChat.bind(this);
    this.renderRow = this.renderRow.bind(this);
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
        users: data,
        loading: false,
        loadSuccess: true,
      })
    }, 100);
  }

  onChat(rowData) {
    this.props.screenProps.redirect(NavigationActions.navigate({
      routeName: 'Chat',
      params: {
        id: rowData.id,
        name: rowData.nickname,
      }
    }));
  }

  renderRow({item: rowData, index: sectionID}) {
    return (
      <ListItem
        roundAvatar
        key={sectionID}
        title={rowData.nickname}

        avatar={{ uri: rowData.avatar }}
        hideChevron={false}
        rightIcon={{ name: 'chevron-right' }}
        onPress={() => this.onChat(rowData)}
      />
    )
  }

  render() {
    return (
      <Page
        {...this.props}
        init={this.init}
        loading={this.state.loading}
      >
        <FlatLists
          refreshing={this.state.loading}
          loadSuccess={this.state.loadSuccess}
          data={this.state.users}
          loadFailTip={{
            tip: '加载失败',
            subTip: '很抱歉，加载聊天列表失败',
          }}
          emptyTip={{
            tip: '还未有其他用户哦！',
          }}

          initialNumToRender={10}
          renderItem={this.renderRow}
          keyExtractor={(item, index) => {
            return index;
          }}
          onRefresh={this.init}
        />
      </Page>
    )
  }
}

const MessageStack = StackNavigator({
  Message: {
    screen: MessageScreen,
  },
});

export default MessageStack;
