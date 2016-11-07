import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import styles from './index.style';

class PullSelect extends Component {
  constructor(props) {
    super(props);

    this.onPress = this.onPress.bind(this);
  }

  onPress() {
    this.props.navigator.showModal({
      screen: this.props.screen,
      title: this.props.title,
      animationType: 'slide-up',
    });
  }

  render() {
    const { placeholder } = this.props;
    return (
      <TouchableHighlight onPress={ this.onPress } underlayColor="#eee" >
        <View style={ styles.buttonWrapper }>
          <Text style={ styles.buttonText }>{ placeholder }</Text>
          <View style={ styles.buttonIcon }>
            <Icon name="chevron-right" size={ 20 } color="#ccc" />
          </View>
        </View>
      </TouchableHighlight>
    )
  }
}

PullSelect.propTypes = {
  placeholder: PropTypes.string.isRequired,
  screen: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
}

export default PullSelect;
