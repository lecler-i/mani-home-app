import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Actions } from 'react-native-router-flux';
import { GiftedChat } from 'react-native-gifted-chat';

import RightButtonFilters from '../../components/NavBar/RightButtonFilters';
import ChatRoomScreen from './ChatRoomScreen';

@inject('appStore', 'chatRoomsStore') @observer
class ChatRoomScreenContainer extends Component {

  constructor(props) {
    super(props);
  
    this.state = {
      messages: this.generateGiftedMessages(this.chatroom.messages),
    };
  }

  onSend = (messages = []) => {
    console.log('SENDING :', this.chatroom, messages);
    
    messages.forEach(this.chatroom.sendMessage);
  }

  get chatroom() {
    const { chatroomId, chatRoomsStore } = this.props;

    return chatRoomsStore.chatrooms.get(chatroomId);
  }

  generateGiftedMessages = (messages) => (
    messages.map(m => ({
      _id: m.id,
      text: m.text,
      user: {
        _id: m.user.id,
        name: m.user.name,
        avatar: m.user.avatar,
      },
      createdAt: m.inserted_at,
    }))
  )

  componentWillReact() {
    console.log("I will re-render, since the todo has changed!");
    const messages = this.generateGiftedMessages(this.chatroom.messages);
    GiftedChat.append([], messages);
    this.setState({ messages });
  }

  render() {
    const messages = this.generateGiftedMessages(this.chatroom.messages);

    console.log('Messages ::', messages, this.state.messages);

    return (
      <ChatRoomScreen
        messages={this.state.messages}
        onSend={this.onSend}
      />
    );
  }
}

export default ChatRoomScreenContainer;
