import React, { Component } from 'react';
import {
  ListView,
} from 'react-native';
import { List, ListItem } from 'react-native-elements';

import { create } from '../SideMenuDecorator';

const list = [
  {
    name: 'Amy Farha',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    subtitle: 'Vice President'
  },
  {
    name: 'Chris Jackson',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'Vice Chairman'
  },
]
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

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(list),
    };

    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  componentDidMount() {
    this.loading = setTimeout(() => {
      
    }, 100);
  }

  componentWillMount() {
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

  renderRow (rowData, sectionID) {
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
    return (
      <ListView
        renderRow={ this.renderRow }
        dataSource={ this.state.dataSource }
      />
    )
  }
}

export default create({
  navigatorButtons: ShareListScreen.navigatorButtons,
})(ShareListScreen);
