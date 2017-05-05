import React, { Component } from 'react';
import {
  ListView,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';

import Recommend from './Recommend';
import Page from '../../components/Page';
import Lists from '../../components/Lists';
import Banner from '../../components/Banner';

import { list, top } from '../../services/recommend';

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
      tops: [],
      recommends: [],
      loading: true,
      loadSuccess: true,
    }

    this.fetchData = this.fetchData.bind(this);
    this.renderRow = this.renderRow.bind(this);
    this.renderHeader = this.renderHeader.bind(this);
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
      const { data: tops, err1 } = await top();
      const { data: recommends, err2 } = await list();
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
        dataSource: ds.cloneWithRows(recommends),
      });
    }, 100);
  }

  renderHeader() {
    return (
      <Banner banners={this.state.tops} />
    );
  }

  renderRow(rowData, sectionID) {
    return <Recommend recommend={rowData} />;
  }

  render() {
    return (
      <Page>
        <Lists
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
          renderHeader={this.renderHeader}
          renderRow={this.renderRow}
        />
      </Page>
    );
  }
}

export default RecommendScreen;
