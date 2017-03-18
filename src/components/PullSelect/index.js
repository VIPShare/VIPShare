import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import styles from './index.style';

class PullSelect extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: null,
    }

    this.onSelect = this.onSelect.bind(this);
    this.onPress = this.onPress.bind(this);
  }

  onSelect(selected) {
    this.setState({
      selected,
    });
    this.props.onChangeText(selected);
  }

  onPress() {
    this.props.navigation.navigate(this.props.screen, {
      onSelect: this.onSelect,
    });
  }

  render() {
    let { placeholder } = this.props;
    if (this.state.selected) {
      placeholder = this.state.selected.title;
    }
    
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
  onChangeText: PropTypes.func.isRequired,
}

PullSelect.defaultProps = {
  onChangeText: () => {},
}

export default PullSelect;
