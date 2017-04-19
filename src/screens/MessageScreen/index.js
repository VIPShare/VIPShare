import React, { Component } from 'react';
import {
  ListView,
} from 'react-native';
import { List, ListItem, Icon } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';

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
  static navigationOptions = ({ navigation }) => {
    const { navigate } = navigation;
    return {
      title: 'Message',
      headerLeft: <Icon name="view-headline" containerStyle={ styles.nav.leftWrapper } onPress={ () => {
        navigate('DrawerOpen');
      } }/>,
      headerRight: false,
      headerVisible: true,

      tabBarLabel: 'Message',
      tabBarIcon: ({ tintColor }) => <Icon name="message" color={ tintColor } />,
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
    this.props.screenProps.redirect(NavigationActions.navigate({
      routeName: 'Chat',
      params: {
        name: rowData.name,
      }
    }));
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
