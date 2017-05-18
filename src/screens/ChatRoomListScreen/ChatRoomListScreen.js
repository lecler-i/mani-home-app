import React from 'react';
import { Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import { inject, observer } from 'mobx-react';
import I18n from 'react-native-i18n';

import styles from './styles';

const ChatRoomItem = ({ chatroom, onPress }) => 
  <TouchableOpacity onPress={onPress} >
    <View style={{ alignItems: 'center', padding: 10, flexDirection: 'row', borderBottomWidth: 1, borderColor: '#f7f7f7' }}>
      <Image></Image>
      <View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 280 }}>
          <Text style={{ marginLeft: 15, fontWeight: '600' }}>{chatroom.withUser.name} {chatroom.withUser.mail}</Text>
          {chatroom.last_message &&
            <Text style={{ color: '#333', fontSize: 10 }}>{chatroom.last_message.inserted_at}</Text>
          }
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {chatroom.last_message &&
            <Text style={{ fontWeight: '400', color: '#333' }}>{chatroom.last_message.text}</Text>
          }
        </View>
      </View>
    </View>
  </TouchableOpacity>;

const ChatRoomListScreen = inject('appStore')(observer(({ data, onChatRoomPress }) => {
  const chatrooms = data.values().map(chatroom =>
    <ChatRoomItem key={chatroom.id} chatroom={chatroom} onPress={() => onChatRoomPress(chatroom)} />);

  return (
    <ScrollView style={[styles.container]} keyboardShouldPersistTaps="always">
      {chatrooms}
    </ScrollView>
  );
}));

export default ChatRoomListScreen;
