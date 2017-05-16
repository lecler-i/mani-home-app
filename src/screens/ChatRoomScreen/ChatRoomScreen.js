import React from 'react';
import { Text } from 'react-native';
import { inject, observer } from 'mobx-react';

import { GiftedChat } from 'react-native-gifted-chat';

import styles from './styles';

const ChatRoomScreen = inject('appStore')(observer(({ appStore, room }) => ({
  return (
    <GiftedChat
      messages={this.state.messages}
      onSend={this.onSend}
      user={{
        _id: appStore.me._id,
      }}
    />
  );

})));

export default ChatRoomScreen;
