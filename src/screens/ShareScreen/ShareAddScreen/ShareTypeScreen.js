import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';
import AccountTypeList from '../../../components/AccountTypeList';

import styles from './index.style';

class ShareTypeScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { state, setParams, navigate } = navigation;
    return {
      mode: 'modal',
      title: '类型',
      headerLeft: false,
      headerRight: (
        <TouchableWithoutFeedback onPress={ () => navigation.goBack() }>
          <View style={ styles.nav.rightWrapper }>
            <Text style={ styles.nav.activeButton } >Cancel</Text>
          </View>
        </TouchableWithoutFeedback>
      ),
      headerVisible: true,
      tabBarVisible: false,
    }
  }

  constructor(props) {
    super(props);

    this.onSelect = this.onSelect.bind(this);
  }

  shouldComponentUpdate() {
    return false;
  }

  onSelect(selected) {
    const navigation = this.props.navigation;
    navigation.goBack();
    navigation.state.params.onSelect(selected);
  }

  render() {
    return (
      <AccountTypeList
        {...this.props}
        onSelect={ this.onSelect }
      />
    );
  }
}

export default ShareTypeScreen;
