import React, { Component } from 'react';
import {
  ListView,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';

import Recommend from './Recommend';

import styles from './index.style';

const list = [
  {
    title: '都搞错了，漫威要出柜的英雄其实是她',
    image: require('../../../__mocks__/recommend/movie.jpg'),
    time: '2小时前',
    type: '漫威',
  },
  {
    title: '都搞错了，漫威要出柜的英雄其实是她',
    image: require('../../../__mocks__/recommend/movie.jpg'),
    time: '2小时前',
    type: '漫威',
  },
]
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
      dataSource: ds.cloneWithRows(list),
    };

    this.renderRow = this.renderRow.bind(this);
  }

  renderRow(rowData, sectionID) {
    return <Recommend recommend={rowData} />;
  }

  render() {
    return (
      <ListView
        style={{ marginTop: 20 }}
        renderRow={this.renderRow}
        dataSource={this.state.dataSource}
      />
    )
  }
}

export default RecommendScreen;
