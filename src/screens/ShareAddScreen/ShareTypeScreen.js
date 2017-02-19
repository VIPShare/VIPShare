import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  Alert,
  ListView,
} from 'react-native';
import { FormLabel, FormInput, ListItem } from 'react-native-elements';

import Flex from '../../components/Flex';

const list = [
  {
    title: '爱奇艺',
  },
  {
    title: '腾讯视频',
  },
  {
    title: '搜狐视频',
  },
];
const leftButtons = [
  {
    title: 'Close',
    id: 'close',
  }
];
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
class ShareTypeScreen extends Component {
  static navigatorButtons = {
    leftButtons,
  }

  constructor(props) {
    super(props);

    this.state = {
      types: [],
      loading: true,
      loadSuccess: true,
    }
  }

  componentDidMount() {
    this.loading = setTimeout(async () => {
      this.setState({
        types: list,
        loading: false,
        loadSuccess: true,
        dataSource: ds.cloneWithRows(list),
      })
    }, 100);
  }

  componentWillUnmount() {
    if (this.loading) {
      clearTimeout(this.loading);
    }
  }

  onNavigatorEvent(event) {
    if (event.type == 'NavBarButtonPress') {
      if (event.id == 'close') {
        this.props.navigator.dismissModal({
          animationType: 'slide-down',
        });
      }
    }
  }

  renderRow(rowData, sectionID) {
    return (
      <ListItem
        roundAvatar
        key={ sectionID }
        title={ rowData.title }
      />
    )
  }

  render() {
    if (!this.state.types.length) {
      return false;
    }
    return (
      <ListView
        renderRow={ this.renderRow }
        dataSource={ this.state.dataSource }
      />
    );
  }
}

export default ShareTypeScreen;
