import React, { PropTypes } from 'react';
import { Text, View } from 'react-native';
import { Grid, Row, Col, List, ListItem, Avatar } from 'react-native-elements';

import styles from './index.style';

const list = [
  {
    title: 'Appointments',
    icon: 'av-timer'
  },
  {
    title: 'Trips',
    icon: 'flight-takeoff'
  },
]
const Drawer = ({
  navigation,
  activeTintColor,
  activeBackgroundColor,
  inactiveTintColor,
  inactiveBackgroundColor,
  getLabel,
  renderIcon,
  style,
  labelStyle,
  drawers,
}) => {
  return (
    <Grid containerStyle={[styles.container, style]}>
      <Row size={1} containerStyle={styles.info.container}>
        <Col size={1}>
          <Avatar
            large
            rounded
            source={{ uri: "https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg" }}
            onPress={() => console.log("Works!")}
            activeOpacity={0.7}
          />
        </Col>
        <Col size={2} containerStyle={styles.info.username.container} >
          <Text style={styles.info.username.text}>WhatAKitty</Text>
          <Text style={styles.info.username.sign}>如果你无法表达你的想法...</Text>
        </Col>
      </Row>
      <Row size={5}>
        <Col>
          <List>
            {
              navigation.state.routes.map((route, index) => {
                const focused = navigation.state.index === index;
                const scene = { route, index, focused };
                const label = getLabel(scene);
                const drawer = drawers[label];
                if (!drawer) return false;
                return (
                  <ListItem
                    key={index}
                    title={drawer.label}
                    titleStyle={labelStyle}
                    leftIcon={{ name: drawer.icon }}
                    hideChevron={true}
                    onPress={() => {
                      navigation.navigate('DrawerClose');
                      navigation.navigate(route.routeName);
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

Drawer.propTypes = {
  navigation: PropTypes.object.isRequired,
  style: View.propTypes.style,
  drawers: PropTypes.object.isRequired,
};

export default Drawer;
