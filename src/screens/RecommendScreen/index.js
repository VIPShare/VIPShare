import React, { Component } from 'react';
import {
  ListView,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';
import Swiper from 'react-native-swiper';

import Recommend from './Recommend';
import Page from '../../components/Page';
import Lists from '../../components/Lists';

import { list } from '../../services/recommend';

import styles from './index.style';

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
class RecommendScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { navigate } = navigation;
    return {
      title: 'Recommend',
      headerLeft: <Icon name="view-headline" containerStyle={styles.nav.leftWrapper} onPress={() => {
        navigate('DrawerOpen');
      }} />,
      headerRight: false,
      headerVisible: true,

      tabBarLabel: 'Recommend',
      tabBarIcon: ({ tintColor }) => <Icon name="movie" iconStyle={{ color: tintColor }} />,
    }
  }

  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      recommends: [],
      loading: true,
      loadSuccess: true,
    }

    this.fetchData = this.fetchData.bind(this);
    this.renderRow = this.renderRow.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  componentWillUnmount() {
    if (this.loading) {
      clearTimeout(this.loading);
    }
  }

  fetchData() {
    this.loading = setTimeout(async () => {
      const { data, err } = await list();
      if (err) {
        this.setState({
          loading: false,
          loadSuccess: false,
        });
        return false;
      }
      this.setState({
        recommends: data,
        loading: false,
        loadSuccess: true,
        dataSource: ds.cloneWithRows(data),
      });
    }, 100);
  }

  renderRow(rowData, sectionID) {
    return <Recommend recommend={rowData} />;
  }

  render() {
    return (
      <Page>
        <Lists
          containerStyle={{ marginTop: 20 }}
          loading={this.state.loading}
          loadSuccess={this.state.loadSuccess}
          data={this.state.recommends}
          dataSource={this.state.dataSource}
          loadingTip={{
            tip: '请稍后',
            subTip: '正在加载影视推荐...',
          }}
          loadFailTip={{
            tip: '加载失败',
            subTip: '很抱歉，加载影视推荐失败',
          }}
          emptyTip={{
            tip: '还未有推荐哦！',
          }}
          renderRow={this.renderRow}
        />
      </Page>
    );
  }
}

export default RecommendScreen;
