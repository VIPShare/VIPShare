import React, { Component, PropTypes } from 'react';
import { Text } from 'react-native';
import { Icon } from 'react-native-elements';

import Page from '../../components/Page';

class Profile extends Component {
  static navigationOptions = {
    headerVisible: false,
    drawerLabel: 'Profile',
    transparentHeader: {
      position: 'absolute',
      backgroundColor: 'transparent',
      zIndex: 100,
      top: 0,
      left: 0,
      right: 0
    },
  }

  render() {
    return (
      <Page>

      </Page>
    );
  }
}

export default Profile;
