import React, { Component, PropTypes } from 'react';
import { Text, AsyncStorage } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';

import Page from '../../components/Page';
import constants from '../../utils/constants';

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
      profile: {},
      messages: [
      ],
      loading: true,
      loadSuccess: false,
    }

    this.init = this.init.bind(this);
    this.onSend = this.onSend.bind(this);

    // const io = require('socket.io-client');
    this.socket = require('socket.io-client')(`${constants.api_root}/chat`, {
      transports: ['websocket'],
    });
  }

  componentWillUnmount() {
    this.socket.disconnect();
  }

  async init() {
    const profile = JSON.parse(await AsyncStorage.getItem('user:profile'));
    this.setState({
      profile,
    })
    this.socket.on('connect', () => {
      console.log('connect!');
      this.socket.emit('chatWith', {
        ownerId: profile.id,
        targetId: this.props.navigation.state.params.id,
      });
    });

    this.socket.on('roomJoined', () => {
      this.setState({
        loading: false,
        loadSuccess: true,
      });
    });

    this.socket.on('reback', ({ messages = [], time }) => {
      this.setState((previousState) => {
        return {
          messages: GiftedChat.append(previousState.messages, messages),
        };
      })
    });

    this.socket.on('echo', ({ messages = [], time }) => {
      this.setState((previousState) => {
        return {
          messages: GiftedChat.append(previousState.messages, messages),
        };
      })
    });

    this.socket.on('res', msg => {
      console.log('res from server: %s!', msg);
    });

    // this.setState({
    //   messages: [
    //     {
    //       _id: 1,
    //       text: 'Hello developer',
    //       createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
    //       user: {
    //         _id: 2,
    //         name: 'React Native',
    //         avatar: 'https://facebook.github.io/react/img/logo_og.png',
    //       },
    //     },
    //   ],
    // }, () => {
    //   this.setState({
    //     loading: false,
    //     loadSuccess: true,
    //   });
    // });
  }

  onSend(messages = []) {
    console.log(`emit message: ${JSON.stringify({
      ownerId: this.state.profile.id,
      targetId: this.props.navigation.state.params.id,
      messages: messages,
    })}`)
    this.socket.emit('send', {
      ownerId: this.state.profile.id,
      targetId: this.props.navigation.state.params.id,
      messages: messages,
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
            _id: this.state.profile.id,
            name: this.state.profile.nickname,
          }}
        />
      </Page>
    )
  }
}

export default ChatScreen;
