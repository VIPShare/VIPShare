import React, { Component, PropTypes } from 'react';
import { View } from 'react-native';
import { FormInput } from 'react-native-elements';

export default class Form extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
  }
  static defaultProps = {
    onChange: () => {},
  }

  constructor(props) {
    super(props);

    this.state = {
      form: {},
    }

    this._putElement = this._putElement.bind(this);
    this._onChange = this._onChange.bind(this);
    this.getValues = this.getValues.bind(this);
  }

  _putElement(key, value) {
    this.setState({
      form: {
        ...this.state.form,
        [key]: value,
      }
    })
  }

  _onChange(key, value) {
    this._putElement(key, value);
    if (this.props.onChange) {
      this.props.onChange({key, value}, this.getValues());
    }
  }

  getValues() {
    return this.state.form;
  }

  render() {
    return (
      <View>
      {
        React.Children.map(this.props.children, child => {
          if (child.type === FormInput) {
            if ('undefined' === typeof child.props.name || child.props.name.trim() === '') {
              // no name specified.
              console.warn('no name specified');
              return false;
            }
            return React.cloneElement(child, {
              onChangeText: (text) => {
                this._onChange(child.props.name, text);
              }
            })
          }
          return child;
        })
      }
      </View>
    )
  }
}
