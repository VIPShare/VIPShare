import React, { Component } from 'react';
import {
  ListView,
} from 'react-native';
import { List, ListItem, Icon } from 'react-native-elements';
import { NavigationActions, StackNavigator } from 'react-navigation';

import Page from '../../components/Page';

import { list } from '../../services/user';
import { isLoginin } from '../../utils/permission';

import styles from './index.style';

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
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
        dataSource: ds.cloneWithRows(data),
      })
    }, 100);
  }

  onChat(rowData) {
    this.props.screenProps.redirect(NavigationActions.navigate({
      routeName: 'Chat',
      params: {
        id: rowData.id,
        name: rowData.name,
      }
    }));
  }

  renderRow(rowData, sectionID) {
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
        <ListView
          renderRow={this.renderRow}
          dataSource={this.state.dataSource}
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
