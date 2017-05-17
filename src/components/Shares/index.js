import React, { Component } from 'react';
import {
  View,
  Text,
  ListView,
  TextInput,
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import { List, ListItem } from 'react-native-elements';
import Swipeout from 'react-native-swipeout';
import Toast from 'react-native-root-toast';

import { viewable } from '../../services/account';

import EmptyView from '../EmptyView';
import { FlatLists } from '../Lists';

const swipeoutBtns = (screenProps, rowData) => {
  return [
    {
      text: '编辑',
      onPress: () => {
        screenProps.redirect(NavigationActions.navigate({
          routeName: 'ShareAdd',
          params: {
            id: rowData.id,
            readonly: !rowData.editable,
          }
        }));
      },
    }
  ]
};

export default class Shares extends Component {
  constructor(props) {
    super(props);

    this.state = {
      current: undefined,
    }

    this.renderRow = this.renderRow.bind(this);
  }

  renderRow(rowData, sectionID, screenProps) {
    return (
      <Swipeout
        key={sectionID}
        right={swipeoutBtns(screenProps, rowData)}
        backgroundColor="transparent"
        disabled={!rowData.editable}
        autoClose={true}
      >
        <ListItem
          title={rowData.type}
          subtitle={rowData.username}
          // avatar={{ uri: rowData.avatar_url }}
          rightIcon={{ name: 'chevron-right' }}
          onPress={() => {
            screenProps.redirect(NavigationActions.navigate({
              routeName: 'ShareAdd',
              params: {
                id: rowData.id,
                readonly: !rowData.editable,
              }
            }));
          }}
        />
      </Swipeout>
    );
  }

  render() {
    const { loading, loadSuccess, accounts, loadFailTip, emptyTip, screenProps, onRefresh } = this.props;
    return (
      <FlatLists
        refreshing={loading}
        loadSuccess={loadSuccess}
        data={accounts}
        loadFailTip={loadFailTip}
        emptyTip={emptyTip}

        initialNumToRender={10}
        renderItem={({ item, index }) => this.renderRow(item, index, screenProps)}
        keyExtractor={(item, index) => {
          return index;
        }}
        onRefresh={onRefresh}
      />
    );
  }
}
