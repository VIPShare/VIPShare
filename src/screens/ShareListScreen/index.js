import React, { Component } from 'react';
import {
  ListView,
  Alert,
} from 'react-native';
import { List, ListItem } from 'react-native-elements';

import EmptyView from '../../components/EmptyView';
import { create } from '../SideMenuDecorator';
import { list } from '../../services/account';

// const list = [
//   {
//     name: 'Amy Farha',
//     avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
//     subtitle: 'Vice President'
//   },
//   {
//     name: 'Chris Jackson',
//     avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
//     subtitle: 'Vice Chairman'
//   },
// ]
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
class ShareListScreen extends Component {
  static navigatorButtons = {
    rightButtons: [
      {
        title: 'Add',
        id: 'add',
        testID: 'add_e2e_rules'
      }
    ]
  };

  constructor(props) {
    super(props);

    this.state = {
      accounts: [],
      loading: true,
      loadSuccess: true,
    }

    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  componentDidMount() {
    this.loading = setTimeout(async () => {
      const { data, err } = await list();
      if (err) {
        Alert.alert(err.message);
        this.setState({
          loading: false,
          loadSuccess: false,
        })
        return false;
      }

      this.setState({
        accounts: data,
        loading: false,
        dataSource: ds.cloneWithRows(data),
      })
    }, 100);
  }

  componentWillUnmount() {
    if (this.loading) {
      clearTimeout(this.loading);
    }
  }

  onNavigatorEvent(event) {
    this.props.onNavigatorEvent(event);
    if (event.type == 'NavBarButtonPress') {
      if (event.id == 'add') {
        this.props.navigator.push({
          screen: 'app.shareAdd',
          title: '分享'
        })
      }
    }
  }

  renderRow(rowData, sectionID) {
    return (
      <ListItem
        roundAvatar
        key={ sectionID }
        title={ rowData.name }
        subtitle={ rowData.subtitle }
        avatar={ {uri:rowData.avatar_url} }
        rightIcon={ {name: 'chevron-right'} }
      />
    )
  }

  render() {
    if (this.state.loading) {
      return (
        <EmptyView
          tip="请稍后"
          subTip="正在加载账号分享列表..."
        />
      );
    }
    if (!this.state.loadSuccess) {
      return (
        <EmptyView
          tip="加载失败"
          subTip="很抱歉，加载账号分享列表失败"
        />
      )
    }
    return (
      <ListView
        renderRow={ this.renderRow }
        dataSource={ this.state.dataSource }
      />
    )
  }
}

export default create()(ShareListScreen);
