import React from 'react';
import { inject, observer } from 'mobx-react';
import { Actions } from 'react-native-router-flux';

import ChatRoomListScreen from './ChatRoomListScreen';

@inject('appStore', 'chatRoomsStore') @observer
class ChatRoomListScreenContainer extends React.Component {
  
  onChatRoomPress = (chatroom) => {
    console.log('Go to ', chatroom);
    Actions.chat_room({ chatroomId: chatroom.id });
  }

  render() {
    const { chatrooms, loading } = this.props.chatRoomsStore;

    return (
      <ChatRoomListScreen
        data={chatrooms}
        onChatRoomPress={this.onChatRoomPress}
      />
    );
  }
}
export default ChatRoomListScreenContainer;
