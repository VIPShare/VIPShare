import React, { Component } from 'react';
import {
  ListView,
} from 'react-native';
import { List, ListItem, Icon } from 'react-native-elements';

import styles from './index.style';

const list = [
  {
    name: 'Amy Farha',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    subtitle: '你在哪里？',
  },
  {
    name: 'Chris Jackson',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: '明天去野外烧烤吧？',
  },
]
class MessageScreen extends Component {
  static navigationOptions = {
    title: 'Message',
    header: ({ state, setParams, navigate }) => {
      return {
        left: <Icon name="view-headline" containerStyle={ styles.nav.leftWrapper } onPress={ () => {
          navigate('DrawerOpen');
        } }/>,
        right: false,
        visible: true,
      }
    },
    tabBar: {
      label: 'Message',
      icon: ({ tintColor }) => <Icon name="message" color={ tintColor } />
    }
  }

  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(list),
    };

    this.onChat = this.onChat.bind(this);
    this.renderRow = this.renderRow.bind(this);
  }

  onChat(rowData) {
    // this.props.navigator.push({
    //   screen: 'app.chat',
    //   title: rowData.name,
    // })
  }

  renderRow (rowData, sectionID) {
    return (
      <ListItem
        roundAvatar
        key={ sectionID }
        title={ rowData.name }
        subtitle={ rowData.subtitle }
        avatar={ {uri:rowData.avatar_url} }
        hideChevron={ false }
        rightIcon={ {name: 'chevron-right'} }
        onPress={ () => this.onChat(rowData) }
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

export default MessageScreen;
