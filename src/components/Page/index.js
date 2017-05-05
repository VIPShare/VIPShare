import React, { PropTypes, Component } from 'react';
import { View } from 'react-native';

import EmptyView from '../EmptyView';

class Page extends Component {
  static propTypes = {
    containerStyle: PropTypes.object.isRequired,
    enableLoad: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
  }
  static defaultProps = {
    containerStyle: {},
    enableLoad: false,
  }

  constructor(props) {
    super(props);

    if (props.enableLoad) {
      this.state = {
        loading: true,  // default loading show
      };
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.enableLoad && 'bool' === typeof nextProps.loading && !nextProps.loading) {
      // while loaded
      this.setState({
        loading: nextProps.loading,
      });
    }
  }

  render() {
    if (this.props.enableLoad && this.state.loading) {
      // show loading page
      return (
        <EmptyView
          tip="loading"
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
