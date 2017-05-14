import React, { Component } from 'react';
import { ScrollView, TouchableWithoutFeedback, View, Text } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { Icon, FormLabel, FormInput, Button } from 'react-native-elements';

import PullSelect from '../../components/PullSelect';
import Page from '../../components/Page';
import Form from '../../components/Form';
import { isBlank } from '../../utils/string';

import styles from './index.style';

const FormItem = Form.Item;
class SignupScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { state = {}, setParams, navigate } = navigation;
    return {
      title: 'Singup',
      headerLeft: <Icon name="keyboard-arrow-left" containerStyle={styles.nav.leftWrapper} onPress={() => {
        navigation.goBack();
      }} />,
      headerRight: (
        <TouchableWithoutFeedback onPress={() => navigation.goBack()} disabled={!(state.params && state.params.finishable)}>
          <View style={styles.nav.rightWrapper}>
            <Text style={(state.params && state.params.finishable) ? styles.nav.activeButton : styles.nav.unactiveButton} >Next</Text>
          </View>
        </TouchableWithoutFeedback>
      ),
    }
  }

  constructor(props) {
    super(props);

    this.onFormValidate = this.onFormValidate.bind(this);
  }

  onFormValidate() {
    const { form } = this.props;

    this.props.navigation.setParams({
      finishable: this.usernameTrue && this.passwordTrue && this.nickTrue && this.emailTrue && this.inviteCodeTrue,
    });
  }

  render() {
    const { getFieldProps, getFieldError, getFieldValidating } = this.props.form;

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
          return cb('请填入密码');
        }
        cb();
        this.passwordTrue = true;
        this.onFormValidate();
      }
    });
    const nickProps = getFieldProps('nick', {
      validator: (value, cb) => {
        if (isBlank(value)) {
          this.nickTrue = false;
          this.onFormValidate();
          return cb('请填入密码');
        }
        cb();
        this.nickTrue = true;
        this.onFormValidate();
      }
    });
    const emailProps = getFieldProps('email', {
      validator: (value, cb) => {
        if (isBlank(value)) {
          this.emailTrue = false;
          this.onFormValidate();
          return cb('请填写邮箱');
        }
        cb();
        this.emailTrue = true;
        this.onFormValidate();
      }
    });
    const inviteCodeProps = getFieldProps('inviteCode', {
      validator: (value, cb) => {
        if (isBlank(value)) {
          this.inviteCodeTrue = false;
          this.onFormValidate();
          return cb('请填写邀请码');
        }
        cb();
        this.inviteCodeTrue = true;
        this.onFormValidate();
      }
    })

    return (
      <Page
        enableLoad={false}
        needLogin={false}
      >
        <ScrollView>
          <Form>
            <FormItem label="用户名" {...(getFieldValidating('username') ? {} : getFieldError('username')) }>
              <FormInput name="username" {...usernameProps} />
            </FormItem>
            <FormItem label="密码" {...(getFieldValidating('password') ? {} : getFieldError('password')) }>
              <FormInput name="password" {...passwordProps} />
            </FormItem>
            <FormItem label="昵称" {...(getFieldValidating('nick') ? {} : getFieldError('nick')) }>
              <FormInput name="nick" {...nickProps} />
            </FormItem>
            <FormItem label="邮箱" {...(getFieldValidating('email') ? {} : getFieldError('email')) }>
              <FormInput name="email" {...emailProps} keyboardType="email-address" />
            </FormItem>
            <FormItem label="邀请码" {...(getFieldValidating('inviteCode') ? {} : getFieldError('inviteCode')) }>
              <FormInput name="inviteCode" {...inviteCodeProps} keyboardType="name-phone-pad" />
            </FormItem>
          </Form>
        </ScrollView>
      </Page>
    );
  }
}

export default Form.create()(SignupScreen);
