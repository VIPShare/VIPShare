import React, { Component } from 'react';
import {
  ListView,
  Animated,
  FlatList,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { NavigationActions, StackNavigator } from 'react-navigation';

import Recommend from './Recommend';
import Page from '../../components/Page';
import { FlatLists } from '../../components/Lists';
import Banner from '../../components/Banner';
import RecommendScreen from './RecommendScreen';

import { isLoginin } from '../../utils/permission';
import { list, top } from '../../services/recommend';

import styles from './index.style';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const VIEWABILITY_CONFIG = {
  minimumViewTime: 3000,
  viewAreaCoveragePercentThreshold: 100,
  waitForInteraction: true,
};

class RecommendsScreen extends Component {
  static navigationOptions = ({ navigation, screenProps }) => {
    const { navigate } = navigation;
    return {
      title: 'Recommend',
      headerLeft: <Icon name="view-headline" containerStyle={styles.nav.leftWrapper} onPress={async () => {
        if (await isLoginin()) {
          navigate('DrawerOpen');
        } else {
          screenProps.redirectLogin();
        }
      }} />,
      headerRight: false,

      tabBarLabel: 'Recommend',
      tabBarIcon: ({ tintColor }) => <Icon name="movie" iconStyle={{ color: tintColor }} />,
    }
  }

  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      tops: [],
      recommends: [],
      loading: true,
      loadSuccess: true,
      pageNumber: 1,
      pageSize: 5,
    }

    this.init = this.init.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.fetchList = this.fetchList.bind(this);
    this.renderItem = this.renderItem.bind(this);
    this.renderHeader = this.renderHeader.bind(this);
  }

  componentWillUnmount() {
    if (this.loading) {
      clearTimeout(this.loading);
      clearTimeout(this.fetchListLoading);
    }
  }

  init() {
    this.fetchData();
  }

  fetchData() {
    this.loading = setTimeout(async () => {
      const { data: tops, err1 } = await top();
      const { data, err2 } = await list(1, 5);
      const { list: recommends, pageInfo } = data;
      if (err1 || err2) {
        this.setState({
          loading: false,
          loadSuccess: false,
        });
        return false;
      }
      this.setState({
        tops,
        recommends,
        loading: false,
        loadSuccess: true,
        pageNumber: pageInfo.pageNumber + 1,
        pageSize: pageInfo.pageSize,
      });
    }, 100);
  }

  fetchList() {
    this.fetchListLoading = setTimeout(async () => {
      const { data, err } = await list(this.state.pageNumber, this.state.pageSize);
      const { list: recommends, pageInfo } = data;
      if (err) {
        return false;
      }

      if (recommends.length == 0) {
        // no more data
        return false;
      }
      this.setState({
        recommends: [...this.state.recommends, ...recommends],
        pageNumber: pageInfo.pageNumber + 1,
        pageSize: pageInfo.pageSize,
      });
    });
  }

  renderHeader() {
    return (
      <Banner banners={this.state.tops} />
    );
  }

  renderItem({ item, index }) {
    return <Recommend {...this.props} key={index} recommend={item} />;
  }

  render() {
    return (
      <Page
        needLogin={false}
        init={this.init}
        loading={this.state.loading}
      >
        <FlatLists
          refreshing={this.state.loading}
          loadSuccess={this.state.loadSuccess}
          data={this.state.recommends}
          loadFailTip={{
            tip: '加载失败',
            subTip: '很抱歉，加载影视推荐失败',
          }}
          emptyTip={{
            tip: '还未有推荐哦！',
          }}

          initialNumToRender={3}
          ListHeaderComponent={this.renderHeader}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => {
            return index;
          }}
          onRefresh={this.fetchData}
          onEndReached={this.fetchList}
        />
      </Page>
    );
  }
}

const RecommendStack = StackNavigator({
  Recommends: {
    screen: RecommendsScreen,
  },
  Recommend: {
    screen: RecommendScreen,
  },
});

export default RecommendStack;
