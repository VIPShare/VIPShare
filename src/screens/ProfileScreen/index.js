import React, { Component, PropTypes } from 'react';
import { Text } from 'react-native';
import { Icon } from 'react-native-elements';

class Profile extends Component {
  static navigationOptions = {
    drawer: () => ({
      label: 'Profile',
      icon: ({ tintColor }) => <Icon name="share" />,
    }),
  }

  render() {
    return <Text>个人资料</Text>
  }
}

export default Profile;
