import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  VirtualizedList,
} from 'react-native';
import { ListItem } from 'react-native-elements';

import Page from '../../../components/Page';
import { FlatLists } from '../../../components/Lists';

import styles from './index.style';

class SexChooseScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { state, setParams, navigate } = navigation;
    return {
      title: 'SexChoose',
      headerLeft: false,
      headerRight: (
        <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
          <View style={styles.nav.rightWrapper}>
            <Text style={styles.nav.activeButton} >Cancel</Text>
          </View>
        </TouchableWithoutFeedback>
      ),
      tabBarVisible: false,
    }
  }

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      loadSuccess: false,
    }

    this.onSelect = this.onSelect.bind(this);
    this.renderItem = this.renderItem.bind(this);
  }

  shouldComponentUpdate() {
    return false;
  }

  onSelect(selected) {
    const navigation = this.props.navigation;
    navigation.goBack();
    navigation.state.params.onSelect(selected);
  }

  renderItem({ item: sex, index }) {
    return (
      <ListItem
        roundAvatar
        key={index}
        title={sex.title}
        onPress={() => {
          this.onSelect(sex);
        }}
      />
    );
  }

  render() {
    const sexList = [
      {
        title: '男',
      },
      {
        title: '女',
      },
    ]
    return (
      <Page
        enableLoad={false}
        needLogin={false}
      >
        <VirtualizedList
          data={sexList}
          renderItem={this.renderItem}
        />
      </Page>
    );
  }
}

export default SexChooseScreen;
