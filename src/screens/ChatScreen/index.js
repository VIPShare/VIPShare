import React, { Component, PropTypes } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';

class ChatScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { state, navigate } = navigation;
    return {
      title: `Chat with ${state.params.name}`,
      headerVisible: true,
      tabBarVisible: false,
    }
  }

  constructor(props) {
    super(props);

    this.state = {
      messages: [],
    }

    this.onSend = this.onSend.bind(this);
  }

  componentWillMount() {
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
      <GiftedChat
        messages={ this.state.messages }
        onSend={this.onSend}
        user={{
          _id: 1,
        }}
      />
    )
  }
}

export default ChatScreen;
