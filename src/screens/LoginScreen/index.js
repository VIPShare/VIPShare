import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Alert,
  TextInput,
  Image,
  Dimensions,
  ScrollView,
  findNodeHandle,
  TouchableWithoutFeedback,
  AsyncStorage,
} from 'react-native';
import { StackNavigator, NavigationActions } from 'react-navigation';
import { FormInput } from 'react-native-elements';

import Form from '../../components/Form';
import { login } from '../../services/auth';
import { info } from '../../services/mine';
import { isBlank } from '../../utils/string';
import constants from '../../utils/constants';

class LoginScreen extends Component {
  static navigationOptions = {
    header: null,
  }

  constructor(props) {
    super(props);

    this.state = {
      scrollEnabled: false,
    }

    this.login = this.login.bind(this);
    this.signup = this.signup.bind(this);
  }

  // Scroll a component into view. Just pass the component ref string.
  inputFocused(refName) {
    setTimeout(() => {
      let scrollResponder = this.refs.scrollView.getScrollResponder();
      scrollResponder.scrollResponderScrollNativeHandleToKeyboard(
        findNodeHandle(this.refs[refName]),
        90, //additionalOffset
        true
      );
    }, 50);
  }

  inputBlured(refName) {
    setTimeout(() => {
      let scrollResponder = this.refs.scrollView.getScrollResponder();
      scrollResponder.scrollResponderScrollNativeHandleToKeyboard(
        findNodeHandle(this.refs[refName]),
        0, //additionalOffset
        true
      );
    }, 50);
  }

  login() {
    const cb = this.props.navigation.state.params.cb;
    const { getFieldsValue, validateForm } = this.props.form;

    validateForm(async errors => {
      if (errors && errors.length > 0) {
        Alert.alert(errors[0].err);
        return;
      }

      const data = getFieldsValue();
      // login
      const { err } = await login(data.username, data.password);
      if (err) {
        // Error login
        Alert.alert('用户名或者密码错误');
        return;
      }

      const { data: profile, err: infoErr } = await info();
      if (infoErr) {
        // Error fetch profile
        Alert.alert('网络通讯存在问题,请稍后再试!');
        return;
      }

      // to https
      if (!profile.avatar.startsWith('http')) {
        profile.avatar = `${constants.api_root}${profile.avatar}`;
      }

      try {
        await AsyncStorage.setItem('user:profile', JSON.stringify(profile));
      } catch (error) {
        // Error saving data
        Alert.alert('网络通讯存在问题,请稍后再试!');
        return;
      }
      cb && 'function' === typeof cb && cb();

      const resetAction = NavigationActions.navigate({
        routeName: 'Main',
      });
      this.props.navigation.dispatch(resetAction);
    })
  }

  signup() {
    this.props.navigation.navigate('Signup');
  }

  render() {
    const { form } = this.props;
    const { getFieldProps } = form;

    const usernameProps = getFieldProps('username', {
      validator: (value, cb) => {
        if (isBlank(value)) {
          return cb('请输入登录账户名');
        }
        cb();
      }
    });
    const passwordProps = getFieldProps('password', {
      validator: (value, cb) => {
        if (isBlank(value)) {
          return cb('请输入登录密码');
        }
        cb();
      }
    })

    return (
      <ScrollView
        ref='scrollView'
        style={styles.sv}
        scrollEnabled={this.state.scrollEnabled}
        contentContainerStyle={styles.container}
        keyboardDismissMode="interactive"
      >
        <Image style={styles.bg} source={require('./login1_bg.png')} />
        <View style={styles.header}>
          <Image style={styles.mark} source={require('./login1_mark.png')} />
        </View>
        <View style={styles.inputs}>
          <View style={styles.inputContainer}>
            <Image style={styles.inputUsername} source={require('./login1_person.png')} />
            <TextInput
              ref="username"
              style={[styles.input, styles.whiteFont]}
              placeholder="Username"
              placeholderTextColor="#FFF"
              onFocus={this.inputFocused.bind(this, 'username')}
              onBlur={this.inputBlured.bind(this, 'username')}
              {...usernameProps}
            />
          </View>
          <View style={styles.inputContainer}>
            <Image style={styles.inputPassword} source={require('./login1_lock.png')} />
            <TextInput
              ref="password"
              password={true}
              style={[styles.input, styles.whiteFont]}
              placeholder="Pasword"
              placeholderTextColor="#FFF"
              onFocus={this.inputFocused.bind(this, 'password')}
              onBlur={this.inputBlured.bind(this, 'password')}
              {...passwordProps}
            />
          </View>
          <View style={styles.forgotContainer}>
            <Text style={styles.greyFont}></Text>
          </View>
        </View>
        <TouchableWithoutFeedback onPress={this.login}>
          <View style={styles.signin}>
            <Text style={styles.whiteFont}>Sign In</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={this.signup}>
          <View style={styles.signup}>
            <Text style={styles.greyFont}>Don't have an account?<Text style={styles.whiteFont}>  Sign Up</Text></Text>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    )
  }
}

const windowSize = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: 'transparent',
  },
  bg: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: windowSize.width,
    height: windowSize.height
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: .5,
    backgroundColor: 'transparent'
  },
  mark: {
    width: 150,
    height: 150
  },
  signin: {
    backgroundColor: '#FF3366',
    padding: 20,
    alignItems: 'center'
  },
  signup: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: .15
  },
  inputs: {
    marginTop: 10,
    marginBottom: 10,
    flex: .25
  },
  inputPassword: {
    marginLeft: 15,
    width: 20,
    height: 21
  },
  inputUsername: {
    marginLeft: 15,
    width: 20,
    height: 20
  },
  inputContainer: {
    padding: 10,
    borderWidth: 1,
    borderBottomColor: '#CCC',
    borderColor: 'transparent'
  },
  input: {
    position: 'absolute',
    left: 61,
    top: 12,
    right: 0,
    height: 20,
    fontSize: 14
  },
  forgotContainer: {
    alignItems: 'flex-end',
    padding: 15,
  },
  greyFont: {
    color: '#D8D8D8'
  },
  whiteFont: {
    color: '#FFF'
  }
});

const Login = Form.create()(LoginScreen);

export default Login;
