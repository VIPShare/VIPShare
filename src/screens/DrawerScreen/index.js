import React, { Component, PropTypes } from 'react';
import { List, ListItem } from 'react-native-elements';

export default class DrawerScreen extends Component {
  static propTypes = {

  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <List containerStyle={{marginBottom: 20}}>
        <ListItem
          key={ 1 }
          title="Angular"
          leftIcon={ {name: 'ios-chatboxes-outline', type: 'ionicon'} }
        />
        <ListItem
          key={ 2 }
          title="Angular"
          leftIcon={ {name: 'ios-chatboxes-outline', type: 'ionicon'} }
        />
      </List>
    )
  }
}
