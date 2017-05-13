import React, { Component, PropTypes } from 'react';
import { View } from 'react-native';
import { FormInput } from 'react-native-elements';

import FormItem from './FormItem';

const create = () => (WrappedCompnent) => {
  class FormWrapper extends Component {
    constructor(props) {
      super(props);

      this.state = {
        form: {},
      }
      this.fields = {};

      this._initElement = this._initElement.bind(this);
      this._putElement = this._putElement.bind(this);
      this._putElements = this._putElements.bind(this);
      this._onChange = this._onChange.bind(this);
      this._setSuccFlag = this._setSuccFlag.bind(this);
      this._validateCb = this._validateCb.bind(this);

      this.getField = this.getField.bind(this);
      this.getFieldProps = this.getFieldProps.bind(this);
      this.getFieldError = this.getFieldError.bind(this);
      this.getFieldValidating = this.getFieldValidating.bind(this);
      this.getFieldsValue = this.getFieldsValue.bind(this);
      this.getFieldValue = this.getFieldValue.bind(this);
      this.validateForm = this.validateForm.bind(this);
      this.setFieldValue = this.setFieldValue.bind(this);
      this.setFieldsValue = this.setFieldsValue.bind(this);
    }

    _initElement(key, options) {
      this.fields = {
        ...this.fields,
        [key]: {
          validator: options.validator,
        },
      }
    }

    _putElement(key, value, cb) {
      this.setState({
        form: {
          ...this.state.form,
          [key]: {
            ...this.state.form[key],
            value,
            validating: false,
          },
        },
      }, cb);
    }

    _putElements(elements, cb) {
      let result = {};
      Object.keys(elements).forEach((key) => {
        const value = elements[key];
        result[key] = {
          ...this.state.form[key],
          value,
          validating: false,
        };
      });
      this.setState({
        form: {
          ...this.state.form,
          ...result,
        },
      }, cb);
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

    _onChange(key, value, cb) {
      this._putElement(key, value, cb);
    }

    _validateCb(fieldName, err) {
      if (err) {
        if ('string' !== typeof err) throw new Error('the validator of error should be string');
        // set error
        this._setSuccFlag(fieldName, {
          success: false,
          message: err,
        });
        return {
          fieldName,
          err,
        };
      }
      // set success
      this._setSuccFlag(fieldName, {
        success: true,
      });
    }

    getField(fieldName) {
      const field = this.state.form[fieldName];
      return {
        ...field,
        ...this.fields[fieldName],
      }
    }

    getFieldProps(fieldName, options = {}) {
      this._initElement(fieldName, options);
      const field = this.getField(fieldName);
      return {
        onChangeText: (value) => {
          this._onChange(fieldName, value, () => {
            options.validator && options.validator(value, (err) => this._validateCb(fieldName, err));
          });
        },
        value: field.value,
      }
    }

    getFieldError(fieldName) {
      const field = this.getField(fieldName);
      return {
        error: field.validated,
        message: field.error,
      }
    }

    getFieldValidating(fieldName) {
      const field = this.getField(fieldName);
      return field.validating;
    }

    getFieldsValue() {
      let formdata = {};
      Object.keys(this.state.form).forEach( key => {
        formdata[key] = this.getFieldValue(key);
      } );
      return formdata;
    }

    getFieldValue(key) {
      return this.getField(key).value;
    }

    validateForm(cb) {
      let errors;
      Object.keys(this.fields).forEach((key, index) => {
        const field = this.getField(key);
        field.validator && field.validator(field.value, (err) => {
          if (this._validateCb(key, err)) {
            errors = [...(errors || {}), this._validateCb(key, err)];
          }
          if (Object.keys(this.fields).length - 1 === index) {
            // the last validate
            cb(errors);
          }
        });
      });
    }

    setFieldValue(key, value, cb = () => {}) {
      this._putElement(key, value, cb);
    }

    setFieldsValue(elements, cb = () => {}) {
      this._putElements(elements, cb);
    }

    render() {
      const form = {
        getFieldProps: this.getFieldProps,
        getFieldError: this.getFieldError,
        getFieldValidating: this.getFieldValidating,
        getFieldsValue: this.getFieldsValue,
        getFieldValue: this.getFieldValue,
        validateForm: this.validateForm,
        setFieldValue: this.setFieldValue,
        setFieldsValue: this.setFieldsValue,
      }

      return (
        <WrappedCompnent {...this.props} form={ form }  />
      )
    }
  }

  Object.keys(WrappedCompnent).forEach(key => {
    FormWrapper[key] = WrappedCompnent[key];
  });

  return FormWrapper;
}



const Form = ({ children }) => {
  return <View>{ children }</View>
}

Form.create = create;
Form.Item = FormItem;

export default Form;
