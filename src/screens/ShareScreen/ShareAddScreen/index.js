import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableWithoutFeedback,
  StyleSheet,
  Alert,
} from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import ShareTypeScreen from './ShareTypeScreen';

import Form from '../../../components/Form';
import PullSelect from '../../../components/PullSelect';
import { isBlank } from '../../../utils/string';

import styles from './index.style';

const FormItem = Form.Item;
class ShareAddScreen extends Component {
  static navigationOptions = {
    title: 'Share',
    header: (navigation) => {
      const { state, setParams, navigate } = navigation;
      return {
        right: (
          <TouchableWithoutFeedback onPress={ () => navigation.goBack() } disabled={ !(state.params && state.params.finishable) }>
            <View style={ styles.nav.rightWrapper }>
              <Text>Finish</Text>
            </View>
          </TouchableWithoutFeedback>
        ),
        visible: true,
      }
    },
    tabBar: {
      visible: false,
    },
  }

  constructor(props) {
    super(props);

    this.onFormValidate = this.onFormValidate.bind(this);
  }

  onFormValidate() {
    const values = this.props.form.getFieldsValue();
    if (isBlank(values.type.title)) {
      Alert.alert('请选择账号类型');
      return false;
    }
    if (isBlank(values.username)) {
      Alert.alert('请输入账号名');
      return false;
    }
    if (isBlank(values.password)) {
      Alert.alert('请输入账号密码');
      return false;
    }
    this.props.navigation.setParams({
      finishable: true,
    });
  }

  render() {
    const { getFieldProps, getFieldError, getFieldValidating } = this.props.form;

    const typeProps = getFieldProps('type', {
      validator: (selected, cb) => {
        const value = selected.title;
        if (value !== 1 || value !== 2 || value !== 3) {
          return cb('账户类型选择有误');
        }
        cb();
        this.onFormValidate();
      }
    });
    const usernameProps = getFieldProps('username', {
      validator: (value, cb) => {
        cb();
        this.onFormValidate();
      }
    });
    const passwordProps = getFieldProps('password', {
      validator: (value, cb) => {
        cb();
        this.onFormValidate();
      }
    });

    return (
      <Form>
        <FormItem label="账户类型" {...(getFieldValidating('type') ? {} : getFieldError('type'))}>
          <PullSelect
            {...typeProps}
            name="type"
            screen="ShareType"
            title="类型" 
            placeholder="请选择账户类型"
            navigation={ this.props.navigation }
          />
        </FormItem>
        <FormItem label="账户名" {...(getFieldValidating('username') ? {} : getFieldError('username'))}>
          <FormInput name="username" {...usernameProps}/>
        </FormItem>
        <FormItem label="账户密码" {...(getFieldValidating('password') ? {} : getFieldError('password'))}>
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
