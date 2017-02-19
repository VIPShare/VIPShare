import React, { Component, PropTypes } from 'react';

import TabBar from '../../components/TabBar';
import ShareListScreen from '../ShareListScreen';
import MessageScreen from '../MessageScreen';

class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TabBar
        tabs={ [
          {
            title: 'Shares',
            icon: 'share',
            selectedIcon: 'share',
            content: <ShareListScreen {...this.props} />,
          },
          {
            title: 'Message',
            icon: 'message',
            selectedIcon: 'message',
            content: <MessageScreen {...this.props} />,
          }
        ] }
      />
    )
  }
}

export default Home;
