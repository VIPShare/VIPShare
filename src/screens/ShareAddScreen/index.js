import React, { Component } from 'react';
import {
  Text,
  TextInput,
  Image,
  View,
  TouchableWithoutFeedback,
  StyleSheet,
  Alert,
  DeviceEventEmitter,
} from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import ShareTypeScreen from './ShareTypeScreen';
import Toast from 'react-native-root-toast';

import Page from '../../components/Page';
import Form from '../../components/Form';
import EmptyView from '../../components/EmptyView';
import PullSelect from '../../components/PullSelect';
import { isBlank } from '../../utils/string';

import { item, viewable, create } from '../../services/account';

import styles from './index.style';

const FormItem = Form.Item;
class ShareAddScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { state = {}, setParams, navigate } = navigation;
    return {
      title: 'Share',
      headerRight: state.params && !state.params.readonly && (
        <TouchableWithoutFeedback onPress={async () => {
          const {data, err} = await create({
            ...state.params.account,
            type: state.params.account.type.title,
          });
          if (err) {
            Toast.show('add share account failed');
          } else {
            DeviceEventEmitter.emit('ShareRefresh');
          }
          
          navigation.goBack();
        }} disabled={!(state.params && state.params.finishable)}>
          <View style={styles.nav.rightWrapper}>
            <Text style={(state.params && state.params.finishable) ? styles.nav.activeButton : styles.nav.unactiveButton} >Finish</Text>
          </View>
        </TouchableWithoutFeedback>
      ),
      tabBarVisible: false,
    }
  }

  constructor(props) {
    super(props);

    this.state = {
      account: {},
      loading: true,
      loadSuccess: false,
    };

    this.init = this.init.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.onPassEnd = this.onPassEnd.bind(this);
    this.onFormValidate = this.onFormValidate.bind(this);
  }

  init() {
    const id = this.props.navigation.state && this.props.navigation.state.params && this.props.navigation.state.params.id;
    if ('undefined' !== typeof id) {
      return this.fetchData(id);
    }
    this.setState({
      loading: false,
      loadSuccess: true,
    });
  }

  fetchData(id) {
    this.fetchDataLoading = setTimeout(async () => {
      const { setFieldsValue } = this.props.form;
      const { data, err } = await item(id);
      if (err) {
        this.setState({
          loading: false,
          loadSuccess: false,
        });
        return false;
      };

      this.setState({
        loading: false,
        loadSuccess: true,
        account: data,
      }, () => {
        setFieldsValue({
          ...data,
        }, () => {
          this.props.navigation.setParams({
            finishable: true,
          });
        });
      });
    }, 100);
  }

  async onPassEnd() {
    if (!isBlank(this.state.password)) {
      const id = this.props.navigation.state && this.props.navigation.state.params && this.props.navigation.state.params.id;
      const { data, err } = await viewable(id, this.state.password);
      if (err || !data.viewable) {
        return this.setState({
          viewableError: true,
        });
      }

      this.setState({
        viewable: true,
      }, () => {
        this.init();
      });
    }
  }

  onFormValidate() {
    const { form } = this.props;

    this.props.navigation.setParams({
      finishable: this.typeTrue && this.usernameTrue && this.passwordTrue && this.sharePassTrue,
      account: form.getFieldsValue(),
    });
  }

  render() {
    const readonly = this.props.navigation.state && this.props.navigation.state.params && this.props.navigation.state.params.readonly || false;
    const { getFieldProps, getFieldError, getFieldValidating } = this.props.form;
    const viewableVar = !readonly || this.state.viewable;

    if (!viewableVar) {
      if (this.state.viewableError) {
        return (
          <EmptyView
            tip="Error View Password"
            footer={
              <Button title="BACK" onPress={() => {
                this.props.navigation.goBack();
              }} />
            }
          />
        )
      }

      return (
        <Page
          containerStyle={{ justifyContent: 'center' }}
          enableLoad={false}
        >
          <TextInput
            style={{ height: 40, borderWidth: 0, paddingLeft: 15, paddingRight: 15, paddingTop: 5, paddingBottom: 5 }}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Enter password"
            secureTextEntry={true}
            onChangeText={(password) => {
              if (!isBlank(password)) {
                this.setState({
                  password,
                });
              }
            }}
          />
          <Button title="View" style={{ marginTop: 30, marginBottom: 60 }} onPress={this.onPassEnd} />
        </Page>
      );
    }

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
    const sharePassProps = getFieldProps('sharePass', {
      validator: (value, cb) => {
        if (isBlank(value)) {
          this.sharePassTrue = false;
          this.onFormValidate();
          return cb('请填入分享密码');
        }
        cb();
        this.sharePassTrue = true;
        this.onFormValidate();
      }
    });

    return (
      <Page
        init={this.init}
        loading={this.state.loading}
      >
        <Form>
          <FormItem label="账户类型" {...(getFieldValidating('type') ? {} : getFieldError('type')) }>
            <PullSelect
              {...typeProps}
              name="type"
              screen="ShareType"
              title="类型"
              placeholder="请选择账户类型"
              navigation={this.props.navigation}
              selected={{
                title: 'object' === typeof typeProps.value ? typeProps.value.title : typeProps.value,
              }}
              disabled={readonly}
            />
          </FormItem>
          <FormItem label="账户名" {...(getFieldValidating('username') ? {} : getFieldError('username')) }>
            <FormInput name="username" {...usernameProps} editable={!readonly} />
          </FormItem>
          <FormItem label="账户密码" {...(getFieldValidating('password') ? {} : getFieldError('password')) }>
            <FormInput name="password" {...passwordProps} editable={!readonly} />
          </FormItem>
          <FormItem label="分享密码" {...(getFieldValidating('sharePass') ? {} : getFieldError('sharePass')) }>
            <FormInput name="sharePass" {...sharePassProps} editable={!readonly} />
          </FormItem>
        </Form>
      </Page>
    );
  }
}

const Index = Form.create()(ShareAddScreen);
export {
  Index as default,
  ShareTypeScreen,
}
