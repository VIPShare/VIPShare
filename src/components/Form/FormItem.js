import React, { Component, PropTypes } from 'react';
import { View } from 'react-native';
import { FormLabel, FormInput } from 'react-native-elements';

class FormItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <FormLabel>{ `${this.props.label}：` }</FormLabel>
        { this.props.children }
      </View>
    )
  }
}

FormItem.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}

export default FormItem;
