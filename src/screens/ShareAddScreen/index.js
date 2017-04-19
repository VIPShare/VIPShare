import React, { Component } from 'react';
import {
  Text,
  Image,
  View,
  TouchableWithoutFeedback,
  StyleSheet,
  Alert,
} from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import ShareTypeScreen from './ShareTypeScreen';

import Form from '../../components/Form';
import PullSelect from '../../components/PullSelect';
import { isBlank } from '../../utils/string';

import styles from './index.style';

const FormItem = Form.Item;
class ShareAddScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { state, setParams, navigate } = navigation;
    return {
      title: 'Share',
      headerRight: (
        <TouchableWithoutFeedback onPress={() => navigation.goBack()} disabled={!(state.params && state.params.finishable)}>
          <View style={styles.nav.rightWrapper}>
            <Text style={(state.params && state.params.finishable) ? styles.nav.activeButton : styles.nav.unactiveButton} >Finish</Text>
          </View>
        </TouchableWithoutFeedback>
      ),
      headerVisible: true,
      tabBarVisible: false,
    }
  }

  constructor(props) {
    super(props);

    this.onFormValidate = this.onFormValidate.bind(this);
  }

  onFormValidate() {
    const { form } = this.props;

    this.props.navigation.setParams({
      finishable: this.typeTrue && this.usernameTrue && this.passwordTrue,
    });
  }

  render() {
    const { getFieldProps, getFieldError, getFieldValidating } = this.props.form;

    const typeProps = getFieldProps('type', {
      validator: (selected, cb) => {
        if (typeof selected !== 'object') {
          this.typeTrue = false;
          this.onFormValidate();
          return cb('请选择账户类型');
        }
        const value = selected.title;
        if (isBlank(value)) {
          this.typeTrue = false;
          this.onFormValidate();
          return cb('请选择账户类型');
        }
        cb();
        this.typeTrue = true;
        this.onFormValidate();
      }
    });
    const usernameProps = getFieldProps('username', {
      validator: (value, cb) => {
        if (isBlank(value)) {
          this.usernameTrue = false;
          this.onFormValidate();
          return cb('请填入账户名');
        }
        cb();
        this.usernameTrue = true;
        this.onFormValidate();
      }
    });
    const passwordProps = getFieldProps('password', {
      validator: (value, cb) => {
        if (isBlank(value)) {
          this.passwordTrue = false;
          this.onFormValidate();
          return cb('请填入账户密码');
        }
        cb();
        this.passwordTrue = true;
        this.onFormValidate();
      }
    });

    return (
      <Form>
        <FormItem label="账户类型" {...(getFieldValidating('type') ? {} : getFieldError('type')) }>
          <PullSelect
            {...typeProps}
            name="type"
            screen="ShareType"
            title="类型"
            placeholder="请选择账户类型"
            navigation={this.props.navigation}
          />
        </FormItem>
        <FormItem label="账户名" {...(getFieldValidating('username') ? {} : getFieldError('username')) }>
          <FormInput name="username" {...usernameProps} />
        </FormItem>
        <FormItem label="账户密码" {...(getFieldValidating('password') ? {} : getFieldError('password')) }>
          <FormInput name="password" {...passwordProps} />
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
