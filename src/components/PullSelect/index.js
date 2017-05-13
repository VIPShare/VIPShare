import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import { NavigationActions } from 'react-navigation';
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

  componentWillReceiveProps(nextProps) {
    if (nextProps.selected !== this.props.selected) {
      this.setState({
        selected: nextProps.selected,
      });
    }
  }

  onSelect(selected) {
    this.setState({
      selected,
    });
    this.props.onChangeText(selected);
  }

  onPress() {
    if ('undefined' !== typeof this.props.action) {
      const action = NavigationActions.navigate({
        ...this.props.action,
        params: {
          ...this.props.action.params,
          onSelect: this.onSelect,
        },
      })
      return this.props.screenProps.redirect(action);
    }

    this.props.navigation.navigate(this.props.screen, {
      onSelect: this.onSelect,
    });
  }

  render() {
    let { placeholder, disabled } = this.props;
    if (this.state.selected) {
      placeholder = this.state.selected.title;
    }

    return (
      <TouchableHighlight onPress={this.onPress} underlayColor="#eee" disabled={disabled} >
        <View style={styles.buttonWrapper}>
          <Text style={styles.buttonText}>{placeholder}</Text>
          <View style={styles.buttonIcon}>
            <Icon name="chevron-right" size={20} color="#ccc" />
          </View>
        </View>
      </TouchableHighlight>
    )
  }
}

PullSelect.propTypes = {
  placeholder: PropTypes.string.isRequired,
  screen: PropTypes.string,
  action: PropTypes.object,
  title: PropTypes.string.isRequired,
  selected: PropTypes.object,
  disabled: PropTypes.bool.isRequired,
  onChangeText: PropTypes.func.isRequired,
}

PullSelect.defaultProps = {
  disabled: false,
  onChangeText: () => { },
}

export default PullSelect;
