import React, { Component } from 'react';
import { View, Image, Text, ScrollView } from 'react-native';
import { Col } from 'react-native-elements';
import HTMLView from 'react-native-htmlview';

import Page from '../../../components/Page';

import { item } from '../../../services/recommend';

import styles from './index.style';

class RecommendScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { state, setParams, navigate } = navigation;
    return {
      title: state.params.title,
      headerVisible: true,
      tabBarVisible: false,
    };
  }

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      loadSuccess: true,
      recommend: {},
    }

    this.init = this.init.bind(this);
    this.fetchData = this.fetchData.bind(this);
  }

  componentWillUnmount() {
    if (this.fetchDataTimeout) {
      clearTimeout(this.fetchDataTimeout);
    }
  }

  init() {
    this.fetchData();
  }

  fetchData() {
    this.fetchDataTimeout = setTimeout(async () => {
      const { data, err } = await item(this.props.navigation.state.params.id);
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
        recommend: data,
      });
    }, 100);
  }

  render() {
    const { recommend } = this.state;
    return (
      <Page
        init={this.init}
        loading={this.state.loading}
      >
        <ScrollView>
          <Col>
            <View style={styles.banner.container}>
              <Image style={styles.banner.image} source={recommend.image} />
            </View>
            <View style={styles.content.container}>
            <Text style={styles.content.title}>{recommend.title}</Text>
            <Text style={styles.content.info}>{`${recommend.date}  ${recommend.source}  |  撰文  ${recommend.author}`}</Text>
            <HTMLView
              value={recommend.content}
            />
            </View>
          </Col>
        </ScrollView>
      </Page>
    );
  }
}

export default RecommendScreen;
