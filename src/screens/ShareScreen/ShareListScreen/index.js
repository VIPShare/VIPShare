import React, { Component } from 'react';
import {
  ListView,
  Alert,
} from 'react-native';
import { List, ListItem, Icon, Button } from 'react-native-elements';

import EmptyView from '../../../components/EmptyView';
import { list } from '../../../services/account';
import { userRequiredAndDispatch, checkAuth } from '../../../utils/permission';

import styles from './index.style';

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
class ShareListScreen extends Component {
  static navigationOptions = {
    title: 'Shares',
    header: ({ state, setParams, navigate }) => {
      return {
        left: <Icon name="view-headline" containerStyle={ styles.nav.leftWrapper } onPress={ () => {
          navigate('DrawerOpen');
        } }/>,
        right: <Icon name="add" containerStyle={ styles.nav.rightWrapper } onPress={ () => {
          navigate('ShareAdd');
        } } />,
        visible: true,
      }
    },
    tabBar: {
      label: 'Shares',
      icon: ({ tintColor }) => <Icon name="share" color={ tintColor } />
    },
  }

  constructor(props) {
    super(props);

    this.state = {
      accounts: [],
      loading: true,
      loadSuccess: true,
    }

    this.fetchData = this.fetchData.bind(this);
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
        if (!(await checkAuth(this.props.screenProps.redirectLogin, err, this.fetchData))) {
          return;
        }

        this.setState({
          loading: false,
          loadSuccess: false,
        })
        return false;
      }
      this.setState({
        accounts: data,
        loading: false,
        loadSuccess: true,
        dataSource: ds.cloneWithRows(data),
      })
    }, 100);
  }

  renderRow(rowData, sectionID) {
    return (
      <ListItem
        roundAvatar
        key={ sectionID }
        title={ rowData.name }
        subtitle={ rowData.subtitle }
        avatar={ {uri:rowData.avatar_url} }
        rightIcon={ {name: 'chevron-right'} }
      />
    )
  }

  render() {
    if (this.state.loading) {
      return (
        <EmptyView
          tip="请稍后"
          subTip="正在加载账号分享列表..."
        />
      );
    }
    if (!this.state.loadSuccess) {
      return (
        <EmptyView
          tip="加载失败"
          subTip="很抱歉，加载账号分享列表失败"
        />
      )
    }
    if (this.state.accounts.length === 0) {
      return (
        <EmptyView
          tip="还未有人分享哦！"
          subTip="点击右上角Add按钮，成为第一个分享者吧！"
        />
      )
    }
    return (
      <ListView
        renderRow={ this.renderRow }
        dataSource={ this.state.dataSource }
      />
    )
  }
}

export default ShareListScreen;
