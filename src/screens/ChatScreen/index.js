import React, { Component, PropTypes } from 'react';
import { Text } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';

import Page from '../../components/Page';

class ChatScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { state, navigate } = navigation;
    return {
      title: `Chat with ${state.params.name}`,
      tabBarVisible: false,
    }
  }

  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      loading: true,
      loadSuccess: false,
    }

    this.init = this.init.bind(this);
    this.onSend = this.onSend.bind(this);
  }

  init() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://facebook.github.io/react/img/logo_og.png',
          },
        },
      ],
    }, () => {
      this.setState({
        loading: false,
        loadSuccess: true,
      });
    });
  }

  onSend(messages = []) {
    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, messages),
      };
    });
  }

  render() {
    return (
      <Page
        init={this.init}
        loading={this.state.loading}
      >
        <GiftedChat
          messages={this.state.messages}
          onSend={this.onSend}
          user={{
            _id: 1,
          }}
        />
      </Page>
    )
  }
}

export default ChatScreen;
