import React, { Component, PropTypes } from 'react';
import { Text } from 'react-native';
import { Icon } from 'react-native-elements';

class MyShare extends Component {
  static navigationOptions = {
    drawer: () => ({
      label: 'My Share',
      icon: ({ tintColor }) => <Icon name="share" />,
    }),
  }

  render() {
    return <Text>我的分享</Text>
  }
}

export default MyShare;
