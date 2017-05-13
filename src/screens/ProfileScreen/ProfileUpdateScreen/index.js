import React, { Component } from 'react';
import { TouchableWithoutFeedback, View, Text } from 'react-native';
import { NavigationAactions } from 'react-navigation';
import { FormLabel, FormInput, Button } from 'react-native-elements';

import Page from '../../../components/Page';
import Form from '../../../components/Form';
import PullSelect from '../../../components/PullSelect';

import { isBlank } from '../../../utils/string';

import { info } from '../../../services/mine';

import styles from './index.style';

const FormItem = Form.Item;
class ProfileUpdateScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { state, setParams, navigate } = navigation;
    return {
      title: 'ProfileUpdate',
      headerRight: (
        <TouchableWithoutFeedback onPress={() => navigation.goBack()} disabled={!(state.params && state.params.finishable)}>
          <View style={styles.nav.rightWrapper}>
            <Text style={(state.params && state.params.finishable) ? styles.nav.activeButton : styles.nav.unactiveButton} >Finish</Text>
          </View>
        </TouchableWithoutFeedback>
      ),
      header: undefined,
    }
  }

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      loadSuccess: false,
      profile: {},
    }

    this.onFormValidate = this.onFormValidate.bind(this);
    this.init = this.init.bind(this);
    this.fetchData = this.fetchData.bind(this);
  }

  componentWillUnmount() {
    clearTimeout(this.fetchDataLoading);
  }

  init() {
    this.fetchData();
  }

  fetchData() {
    this.fetchDataLoading = setTimeout(async () => {
      const { setFieldsValue } = this.props.form;
      const { data, err } = await info();
      if (err) {
        this.setState({
          loading: false,
          loadSuccess: false,
        });
        return false;
      }

      this.setState({
        loading: false,
        loadSuccess: true,
        profile: data,
      }, () => {
        setFieldsValue({
          ...this.state.profile,
        });
      });
    }, 100);
  }

  onFormValidate() {
    const { form } = this.props;

    this.props.navigation.setParams({
      finishable: this.nickTrue && this.sexTrue && this.birthdayTrue && this.addressTrue && this.emailTrue,
    });
  }

  render() {
    const { getFieldProps, getFieldError, getFieldValidating } = this.props.form;

    const nickProps = getFieldProps('nick', {
      validator: (value, cb) => {
        if (isBlank(value)) {
          this.nickTrue = false;
          this.onFormValidate();
          return cb('请填入昵称');
        }
        cb();
        this.nickTrue = true;
        this.onFormValidate();
      }
    });
    const sexProps = getFieldProps('sex', {
      validator: ({title}, cb) => {
        if (isBlank(title)) {
          this.sexTrue = false;
          this.onFormValidate();
          return cb('请选择性别');
        }
        cb();
        this.sexTrue = true;
        this.onFormValidate();
      }
    });
    const birthdayProps = getFieldProps('birthday', {
      validator: (value, cb) => {
        if (isBlank(value)) {
          this.birthdayTrue = false;
          this.onFormValidate();
          return cb('请选择生日');
        }
        cb();
        this.birthdayTrue = true;
        this.onFormValidate();
      }
    });
    const addressProps = getFieldProps('address', {
      validator: (value, cb) => {
        if (isBlank(value)) {
          this.addressTrue = false;
          this.onFormValidate();
          return cb('请填写地址');
        }
        cb();
        this.addressTrue = true;
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

    const profile = this.state.profile || {};
    return (
      <Page
        init={this.init}
        loading={this.state.loading}
      >
        <Form>
          <FormItem label="昵称" {...(getFieldValidating('nick') ? {} : getFieldError('nick')) }>
            <FormInput name="nick" {...nickProps}/>
          </FormItem>
          <FormItem label="性别" {...(getFieldValidating('sex') ? {} : getFieldError('sex')) }>
            <PullSelect
              {...sexProps}
              {...this.props}
              name="type"
              title="Sex"
              placeholder="请选择性别"
              action={{
                routeName: 'SexChoose'
              }}
              selected={{
                title: 'object' === typeof sexProps.value ? sexProps.value.title : sexProps.value,
              }}
            />
          </FormItem>
          <FormItem label="生日" {...(getFieldValidating('birthday') ? {} : getFieldError('birthday')) }>
            <FormInput name="birthday" {...birthdayProps}/>
          </FormItem>
          <FormItem label="所在地" {...(getFieldValidating('address') ? {} : getFieldError('address')) }>
            <FormInput name="address" {...addressProps}/>
          </FormItem>
          <FormItem label="邮箱" {...(getFieldValidating('email') ? {} : getFieldError('email')) }>
            <FormInput name="email" {...emailProps}/>
          </FormItem>
        </Form>
      </Page>
    );
  }
}

export default Form.create()(ProfileUpdateScreen);
export { default as SexChooseScreen } from './SexChooseScreen';
