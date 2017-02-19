import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { FormLabel, FormInput } from 'react-native-elements';
import ShareTypeScreen from './ShareTypeScreen';

import Form from '../../components/Form';
import PullSelect from '../../components/PullSelect';
import { isBlank } from '../../utils/string';

let finishButton = {
  title: 'Finish',
  id: 'finish',
  disabled: true,
}
const FormItem = Form.Item;
class ShareAddScreen extends Component {
  static navigatorButtons = {
    rightButtons: [
      finishButton,
    ]
  };

  constructor(props) {
    super(props);
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

  // onFormValidate(values) {
  //   if (isBlank(values.type)) {
  //     // Alert.alert('请选择账号类型');
  //     return false;
  //   }
  //   if (isBlank(values.username)) {
  //     // Alert.alert('请输入账号名');
  //     return false;
  //   }
  //   if (isBlank(values.password)) {
  //     // Alert.alert('请输入账号密码')
  //     return false;
  //   }
  //   return true;
  // }

  render() {
    const { getFieldProps, getFieldError, getFieldValidating } = this.props.form;

    const typeProps = getFieldProps('type', {
      validator: (value, cb) => {
        if (value !== 1 || value !== 2 || value !== 3) {
          return cb('账户类型选择有误');
        }
        cb();
      }
    });
    const usernameProps = getFieldProps('username', {
      validator: (value, cb) => {
        cb();
      }
    });
    const passwordProps = getFieldProps('password', {
      validator: (value, cb) => {
        cb();
      }
    });

    return (
      <Form>
        <FormItem label="账户类型" {...getFieldValidating('type')}>
          <PullSelect 
            name="type" {...typeProps} 
            screen="shareAdd.typeChoose" 
            title="类型" 
            placeholder="请选择账户类型"
            navigator={ this.props.navigator }
          />
        </FormItem>
        <FormItem label="账户名" {...getFieldValidating('username')}>
          <FormInput name="username" {...usernameProps}/>
        </FormItem>
        <FormItem label="账户密码" {...getFieldValidating('password')}>
          <FormInput name="password" {...passwordProps}/>
        </FormItem>
      </Form>
    );
  }
}

const Index = Form.create()(ShareAddScreen);
export {
  Index as default,
  ShareTypeScreen,
}
