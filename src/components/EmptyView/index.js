import React, { Component, PropTypes } from 'react';
import { View, Text } from 'react-native';

class EmptyView extends Component {
  static propTypes = {
    tip: PropTypes.string.isRequired,
    subTip: PropTypes.string,
    icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  }
  static defaultProps = {

  }

  constructor(props) {
    super(props);
  }

  render() {
    const { tip, subTip } = this.props;
    return (
      <View>
        <Text>{ tip }</Text>
        {
          subTip ?
          <Text>subTip</Text>
          :
          false
        }
      </View>
    )
  }
}

export default EmptyView;
