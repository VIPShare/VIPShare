import React, { Component, PropTypes } from 'react';
import { Text, View, AsyncStorage, Platform, DeviceEventEmitter } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Grid, Row, Col, Avatar } from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import Spinner from 'react-native-loading-spinner-overlay';
import Toast from 'react-native-root-toast';
import ImageResizer from 'react-native-image-resizer';

import ProfileUpdateScreen from './ProfileUpdateScreen';
import Page from '../../components/Page';
import PersonItem from './PersonItem';
import constants from '../../utils/constants';

import { statistics, avatar } from '../../services/mine';

import styles from './index.style';

class Profile extends Component {
  static navigationOptions = {
    header: null,
    drawerLabel: 'Profile',
  }

  constructor(props) {
    super(props);

    this.state = {
      profile: {},
      loading: true,
      loadSuccess: false,
      imageLoading: false,
    };

    this.init = this.init.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.onPressAvatar = this.onPressAvatar.bind(this);
  }

  async init() {
    const profile = JSON.parse(await AsyncStorage.getItem('user:profile'));
    this.setState({
      profile,
    }, () => {
      this.fetchData();
    });
  }

  async fetchData() {
    const { data, err } = await statistics();
    if (err) {
      this.setState({
        loading: false,
        loadSuccess: false,
        statistics: {},
      });
      return false;
    }
    this.setState({
      loading: false,
      loadSuccess: true,
      statistics: data,
    });
  }

  onPressAvatar() {
    ImagePicker.showImagePicker({
      title: 'Select Avatar',
      storageOptions: {
        skipBackup: true,
        path: 'images'
      },
      noData: true,
      mediaType: 'photo',
    }, (response) => {
      this.setState({
        imageLoading: true,
      }, async () => {
        if (response.didCancel) {
          this.setState({
            imageLoading: false,
          });
          return false;
        } else if (response.error) {
          this.setState({
            imageLoading: false,
          });
          return false;
        } else if (response.customButton) {
          this.setState({
            imageLoading: false,
          });
          return false;
        } else {
          let source = { uri: response.uri };

          let resizedUri;
          try {
            resizedUri = await ImageResizer.createResizedImage(response.uri, 120, 120, 'JPEG', 100);
          } catch (error) {
            this.setState({
              imageLoading: false,
            });
            Toast.show('update avatar failed');
            return false;
          }

          const { data, err: err2 } = await avatar({
            uri: resizedUri,
            type: 'multipart/form-data',
            name: `${this.state.profile.nickname}_${Math.floor(Math.random() * 100000)}.png`,
          });
          if (err2) {
            this.setState({
              imageLoading: false,
            });
            Toast.show('update avatar failed');
            return false;
          }

          let profile = {
            ...this.state.profile,
            avatar: `${constants.api_root}${data.filename}`,
          };
          await AsyncStorage.setItem('user:profile', JSON.stringify(profile));
          this.setState({
            profile,
            imageLoading: false,
          }, () => {
            DeviceEventEmitter.emit('AvatarRefresh');
          });
        }
      });
    });
  }

  render() {
    const { profile, statistics } = this.state;
    return (
      <Page
        init={this.init}
        enableLoad={false}
      >
        <Spinner visible={this.state.imageLoading} />
        <Grid containerStyle={{ flex: 1 }}>
          <Row size={1} containerStyle={{ backgroundColor: '#aaa' }}>
            <Col containerStyle={{ flex: 1 }}>
              <Row containerStyle={styles.header.container}>
                <Col size={1} containerStyle={styles.header.left.container} onPress={() => {
                  this.props.navigation.navigate('Recommends');
                }}>
                  <Text style={styles.header.left.text}>{'<'}</Text>
                </Col>
                <Col size={3} containerStyle={styles.header.title.container}>
                  <Text style={styles.header.title.text}>Profile</Text>
                </Col>
                <Col size={1} containerStyle={styles.header.right.container} onPress={() => {
                  this.props.navigation.navigate('ProfileUpdate');
                }}>
                  <Text style={styles.header.right.text}>Edit</Text>
                </Col>
              </Row>
              <Row containerStyle={styles.avatar.container} onPress={this.onPressAvatar}>
                <Avatar
                  xlarge
                  rounded
                  source={{ uri: profile.avatar }}
                  containerStyle={styles.avatar.avatar}
                  activeOpacity={1}
                />
                <View style={styles.avatar.info.container}>
                  <Text style={styles.avatar.info.text}>{profile.nickname}</Text>
                </View>
              </Row>
            </Col>
          </Row>
          <Row size={2}>
            <Col size={1}>
              <Row size={1} containerStyle={styles.items.container}>
                <PersonItem
                  icon={{
                    name: 'share',
                    color: 'blue',
                  }}
                  title={this.state.loading ? '加载中' : (this.state.loadSuccess ? `分享了${statistics.shares_count}个账号` : '加载失败')}
                />
                <PersonItem
                  icon={{
                    name: 'people',
                    color: 'red',
                  }}
                  title={this.state.loading ? '加载中' : (this.state.loadSuccess ? `结交了${statistics.friends_count}位好友` : '加载失败')}
                />
              </Row>
              <Row size={1}>
                <PersonItem
                  icon={{
                    name: 'favorite',
                    color: 'red',
                  }}
                  title={this.state.loading ? '加载中' : (this.state.loadSuccess ? `帮助了${statistics.helpful_count}次` : '加载失败')}
                />
                <PersonItem
                  icon={{
                    name: 'more-horiz',
                    color: '#000',
                  }}
                  title="更多敬请期待"
                />
              </Row>
            </Col>
          </Row>
        </Grid>
      </Page>
    );
  }
}

const ProfileStack = StackNavigator({
  Profile: {
    screen: Profile,
  },
  ProfileUpdate: {
    screen: ProfileUpdateScreen,
  },
}, {
    // headerMode: 'screen',
    navigationOptions: {
      header: null,
    },
  });

export default ProfileStack;
