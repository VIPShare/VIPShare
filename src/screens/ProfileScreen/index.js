import React, { Component, PropTypes } from 'react';
import { Text } from 'react-native';
import { Grid, Row, Col, Avatar } from 'react-native-elements';

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
  }

  render() {
    return (
      <Page
        enableLoad={false}
      >
        <Grid containerStyle={{ flex: 1 }}>
          <Row size={1} containerStyle={{ backgroundColor: '#aaa' }}>
            <Col containerStyle={{ flex: 1 }}>
              <Row containerStyle={styles.header.container}>
                <Col size={1} containerStyle={styles.header.left.container} onPress={ () => {
                  this.props.navigation.navigate('Recommends');
                } }>
                  <Text style={styles.header.left.text}>{'<'}</Text>
                </Col>
                <Col size={3} containerStyle={styles.header.title.container}>
                  <Text style={styles.header.title.text}>Profile</Text>
                </Col>
                <Col size={1} containerStyle={styles.header.right.container}>
                  <Text style={styles.header.right.text}>Edit</Text>
                </Col>
              </Row>
              <Row containerStyle={styles.avatar.container}>
                <Avatar
                  xlarge
                  rounded
                  source={{ uri: "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg" }}
                  containerStyle={styles.avatar.avatar}
                />
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

export default Profile;
