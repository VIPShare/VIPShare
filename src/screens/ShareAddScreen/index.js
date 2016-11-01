import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { FormLabel, FormInput } from 'react-native-elements';

import Form from '../../components/Form';
import { isBlank } from '../../utils/string';

let finishButton = {
  title: 'Finish',
  id: 'finish',
  disabled: true,
}
export default class ShareAddScreen extends Component {
  static navigatorButtons = {
    rightButtons: [
      finishButton,
    ]
  };

  constructor(props) {
    super(props);

    props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  onNavigatorEvent(event) {
    if (event.type == 'NavBarButtonPress') {
      if (event.id === 'finish') {
        // post formdata
        const formData = this.refs.form.getValues();
        Alert.alert(JSON.stringify(formData));
      }
    }
  }

  onFormValidate(values) {
    if (isBlank(values.type)) {
      // Alert.alert('请选择账号类型');
      return false;
    }
    if (isBlank(values.username)) {
      // Alert.alert('请输入账号名');
      return false;
    }
    if (isBlank(values.password)) {
      // Alert.alert('请输入账号密码')
      return false;
    }
    return true;
  }

  render() {
    return (
      <Form
        ref="form"
        onChange={ (item, values) => {
          if (this.onFormValidate(values)) {
            this.props.navigator.setButtons({
              rightButtons: [
                {...finishButton, disabled: false},
              ]
            })
          }
        } }
      >
        <FormLabel>账号类型</FormLabel>
        <FormInput name="type"/>
        <FormLabel>账号名</FormLabel>
        <FormInput name="username"/>
        <FormLabel>账号密码</FormLabel>
        <FormInput name="password"/>
      </Form>
    );
  }
}
