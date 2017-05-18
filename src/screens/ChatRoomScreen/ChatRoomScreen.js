import React from 'react';
import { Text } from 'react-native';
import { inject, observer } from 'mobx-react';

import { GiftedChat } from 'react-native-gifted-chat';

import styles from './styles';

const ChatRoomScreen = inject('appStore')(observer(({ messages, onSend }) => (
  <GiftedChat
    messages={messages}
    onSend={onSend}
    user={{
      _id: 2,
    }}
    keyboardShouldPersistTaps={'never'}
  />
)));

export default ChatRoomScreen;
