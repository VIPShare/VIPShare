import React, { PropTypes, Component } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';

import EmptyView from '../EmptyView';

import { isLoginin } from '../../utils/permission';

import styles from './index.style';

class Page extends Component {
  static propTypes = {
    containerStyle: PropTypes.object.isRequired,
    needLogin: PropTypes.bool.isRequired,
    enableLoad: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,

    init: PropTypes.func.isRequired,
  }
  static defaultProps = {
    containerStyle: {},
    needLogin: true,
    enableLoad: true,
    init: () => { },
  }

  constructor(props) {
    super(props);

    this.state = {
      loginin: false, // default not loginin.
      loading: true,  // default loading show
    }
  }

  async componentDidMount() {
    if (this.props.needLogin) {
      if (await isLoginin()) {
        this.setState({
          loginin: true,
        });
        this.props.init();
      }
    } else {
      this.props.init();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.enableLoad && 'boolean' === typeof nextProps.loading && !nextProps.loading) {
      // while loaded
      this.setState({
        loading: nextProps.loading,
      });
    }
  }

  render() {
    if (this.props.needLogin && !this.state.loginin) {
      // show need login page
      return (
        <EmptyView
          tip="Need Login"
          footer={
            <Button title="PRESSED TO LOGIN" onPress={() => {
              this.props.screenProps.redirectLogin();
            }} />
          }
        />
      );
    }
    if (this.props.enableLoad && this.state.loading) {
      // show loading page
      return (
        <EmptyView
          tip=""
          icon={require('../../assets/loading.gif')}
          iconStyle={styles.loading.image}
        />
      );
    }

    return (
      <View style={[this.props.containerStyle, { flex: 1 }]}>
        {this.props.children}
      </View>
    );
  }
}

export default Page;
