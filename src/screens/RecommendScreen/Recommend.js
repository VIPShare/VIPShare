import React from 'react';
import { Text, Image, View } from 'react-native';
import { Card, Grid, Row, Col, Badge } from 'react-native-elements'

import styles from './Recommend.style';

export default ({ recommend }) => {
  return (
    <Card
      flexDirection="row"
      containerStyle={styles.recommend.container}
    >
      <Grid containerStyle={styles.recommend.wrapper}>
        <Row>
          <Col containerStyle={styles.recommend.content.container}>
            <Text style={styles.recommend.content.title.text}>{recommend.title}</Text>
            <View style={styles.recommend.content.bar.container}>
              <Badge containerStyle={styles.recommend.content.bar.badge.container} textStyle={styles.recommend.content.bar.badge.text} value={recommend.type} />
              <Text style={styles.recommend.content.bar.time.text}>{recommend.time}</Text>
            </View>
          </Col>
          <Col containerStyle={styles.recommend.preview.container}>
            <Image source={recommend.image} style={styles.recommend.preview.image} />
          </Col>
        </Row>
      </Grid>
    </Card>
  );
};
