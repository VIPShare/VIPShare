import React, { Component, PropTypes } from 'react';
import { View } from 'react-native';
import { FormInput } from 'react-native-elements';

import FormItem from './FormItem';

const create = () => (WrappedCompnent) => {
  class FormWrapper extends Component {
    static navigatorButtons = WrappedCompnent.navigatorButtons || [];
    
    constructor(props) {
      super(props);

      this.state = {
        form: {},
      }

      this._putElement = this._putElement.bind(this);
      this._onChange = this._onChange.bind(this);
      this._setSuccFlag = this._setSuccFlag.bind(this);

      this.getFieldProps = this.getFieldProps.bind(this);
      this.getFieldError = this.getFieldError.bind(this);
      this.getFieldValidating = this.getFieldValidating.bind(this);
    }

    _putElement(key, value) {
      this.setState({
        form: {
          ...this.state.form,
          [key]: {
            value,
            validating: false,
          },
        }
      })
    }

    _setSuccFlag(key, options) {
      this.setState({
        form: {
          ...this.state.form,
          [key]: {
            ...this.state.form[key],
            validated: options.success,
            error: options.success ? undefined : options.message,
          },
        }
      })
    }

    _onChange(key, value) {
      this._putElement(key, value);
    }

    getFieldProps(fieldName, options = {}) {
      const field = this.state.form[fieldName];
      return {
        onChangeText: (value) => {
          const cb = (err) => {
            if (err) {
              if ('string' !== typeof err) throw new Error('the validator of error should be string');
              // set error
              this._setSuccFlag(fieldName, {
                success: false,
                message: err,
              });
              return false;
            }
            // set success
            this._setSuccFlag(fieldName, {
              success: true,
            });
          }

          this._onChange(fieldName, value);
          options.validator && options.validator(value, cb);
        },
        value: field ? field.value : undefined,
      }
    }

    getFieldError(fieldName) {
      const field = this.state.form[fieldName];
      return {
        error: field ? field.validated : undefined,
        message: field ? field.error : undefined,
      }
    }

    getFieldValidating(fieldName) {
      const field = this.state.form[fieldName];
      return field ? field.validating : undefined;
    }

    render() {
      const form = {
        getFieldProps: this.getFieldProps,
        getFieldError: this.getFieldError,
        getFieldValidating: this.getFieldValidating,
      }

      return (
        <WrappedCompnent {...this.props} form={ form }  />
      )
    }
  }

  return FormWrapper;
}

const Form = ({ children }) => {
  return <View>{ children }</View>
}

Form.create = create;
Form.Item = FormItem;

export default Form;
