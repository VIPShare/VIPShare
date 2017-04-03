import React, { Component, PropTypes } from 'react';
import { ListView, InteractionManager } from 'react-native';
import { ListItem } from 'react-native-elements';

import EmptyView from '../EmptyView';

const list = [
  {
    title: '爱奇艺',
  },
  {
    title: '腾讯视频',
  },
  {
    title: '搜狐视频',
  },
];
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
class AccountTypeList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      types: [],
      loading: true,
      loadSuccess: true,
    }

    this.fetchData = this.fetchData.bind(this);
    this.renderRow = this.renderRow.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
    this.handler = InteractionManager.runAfterInteractions(() => {
      this.fetchData();
    })
  }

  componentWillUnmount() {
    this._isMounted = false;
    InteractionManager.clearInteractionHandle(this.handler);
  }

  fetchData() {
    this._isMounted && this.setState({
      types: list,
      loading: false,
      loadSuccess: true,
      dataSource: ds.cloneWithRows(list),
    });
  }

  renderRow(rowData, sectionID) {
    return (
      <ListItem
        roundAvatar
        key={ sectionID }
        title={ rowData.title }
        onPress={ () => {
          this.props.onSelect(rowData);
        } }
      />
    )
  }

  render() {
    if (this.state.loading) {
      return (
        <EmptyView
          tip="Loading~"
          subTip="We are doing our possible to get the data from server..."
        />
      );
    }
    if (!this.state.loadSuccess) {
      return (
        <EmptyView
          tip="Ooopts... No type could be choosen."
          subTip="Something error maybe caused."
        />
      );
    }
    return (
      <ListView
        renderRow={ this.renderRow }
        dataSource={ this.state.dataSource }
      />
    );
  }
};

AccountTypeList.propTypes = {
  onSelect: PropTypes.func.isRequired,
}

AccountTypeList.defaultProps = {
  onSelect: () => {},
}

export default AccountTypeList;
