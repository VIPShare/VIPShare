import React, { Component, PropTypes } from 'react';
import { Text, View, AsyncStorage } from 'react-native';
import { Grid, Row, Col, List, ListItem, Avatar } from 'react-native-elements';

import { isLoginin } from '../../utils/permission';

import styles from './index.style';

class Drawer extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    style: View.propTypes.style,
    drawers: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      loginin: false, // default not loginin.
      profile: {},
    }

    this.renderInfo = this.renderInfo.bind(this);
  }

  async componentDidMount() {
    if (await isLoginin()) {
      const profile = JSON.parse(await AsyncStorage.getItem('user:profile'));
      this.setState({
        loginin: true,
        profile,
      });
    }
  }

  renderInfo(loginin, profile) {
    if (loginin) {
      return (
        <Col size={2} containerStyle={styles.info.username.container} >
          <Text style={styles.info.username.text}>{profile.nick}</Text>
          <Text style={styles.info.username.sign}>如果你无法表达你的想法...</Text>
        </Col>
      );
    }
    return (
      <Col size={2} containerStyle={styles.info.username.container} >
        <Text style={styles.info.username.text}>NEED LOGIN</Text>
      </Col>
    );
  }

  render() {
    const { navigation,
      activeTintColor,
      activeBackgroundColor,
      inactiveTintColor,
      inactiveBackgroundColor,
      getLabel,
      renderIcon,
      style,
      labelStyle,
      drawers } = this.props;
    const { loginin, profile } = this.state;
    const avatar = loginin ? { uri: profile.avatar } : { uri: "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg" };
    return (
      <Grid containerStyle={[styles.container, style]}>
        <Row size={1} containerStyle={styles.info.container}>
          <Col size={1}>
            <Avatar
              large
              rounded
              source={avatar}
              onPress={() => {
                if (loginin) {
                  navigation.navigate('Profile')
                }
              }}
              activeOpacity={0.7}
            />
          </Col>
          {this.renderInfo(loginin, profile)}
        </Row>
        <Row size={5}>
          <Col>
            <List containerStyle={styles.list.container}>
              {
                navigation.state.routes.map((route, index) => {
                  const focused = navigation.state.index === index;
                  const scene = { route, index, focused };
                  const label = getLabel(scene);
                  const drawer = drawers[label];
                  if (!drawer) return false;
                  return (
                    <ListItem
                      containerStyle={styles.list.item.container}
                      key={index}
                      title={drawer.label}
                      titleStyle={labelStyle}
                      titleContainerStyle={styles.list.item.title}
                      leftIcon={{ name: drawer.icon, style: styles.list.item.leftIcon }}
                      hideChevron={true}
                      onPress={() => {
                        if (loginin) {
                          navigation.navigate('DrawerClose');
                          navigation.navigate(route.routeName);
                        }
                      }}
                    />
                  );
                })
              }
            </List>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default Drawer;
