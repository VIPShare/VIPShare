import React, { Component, PropTypes } from 'react';
import { Text, View, AsyncStorage } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Grid, Row, Col, Avatar } from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';

import ProfileUpdateScreen from './ProfileUpdateScreen';
import Page from '../../components/Page';
import PersonItem from './PersonItem';

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
    };

    this.init = this.init.bind(this);
    this.onPressAvatar = this.onPressAvatar.bind(this);
  }

  async init() {
    const profile = JSON.parse(await AsyncStorage.getItem('user:profile'));
    this.setState({
      profile,
    });
  }

  onPressAvatar() {
    console.log('press avatar')
    ImagePicker.showImagePicker({
      title: 'Select Avatar',
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    }, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        let source = { uri: response.uri };

        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          avatarSource: source
        });
      }
    });
  }

  render() {
    const profile = this.state.profile;
    return (
      <Page
        init={this.init}
        enableLoad={false}
      >
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
                  source={{uri: profile.avatar}}
                  containerStyle={styles.avatar.avatar}
                  activeOpacity={1}
                />
                <View style={styles.avatar.info.container}>
                  <Text style={styles.avatar.info.text}>{profile.nick}</Text>
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
                  title="分享了4个账号"
                />
                <PersonItem
                  icon={{
                    name: 'people',
                    color: 'red',
                  }}
                  title="结交了10位好友"
                />
              </Row>
              <Row size={1}>
                <PersonItem
                  icon={{
                    name: 'favorite',
                    color: 'red',
                  }}
                  title="帮助了234次"
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
