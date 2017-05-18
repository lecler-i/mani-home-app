import { types } from 'mobx-state-tree';
import fetchApi from '../utils/fetch';
import appStore from './AppStore';

import { User } from './AuthStore';

export const Message = types.model('Message', {
  id: types.identifier(types.number),
  text: types.string,
  inserted_at: types.string,
  user: types.maybe(User),
  get _id() {
    return this.id;
  },
  get createdAt() {
    return this.inserted_at;
  },
});

export const ChatRoom = types.model('ChatRoom', {
  id: types.identifier(types.number),
  messages: types.optional(types.array(Message), []),
  last_message: types.maybe(Message),
  users: types.array(User),
  get withUser() {
    const users = this.users.filter(user =>
      user.id !== appStore.me.id,
    );
    return users[0];
  },
}, {
  sendMessage({ text }) {
    const body = {
      message: {
        text,
        user: 2, //appStore.me.id,
      },
    };
    return fetchApi(`/chats/${this.id}/messages`, 'POST', body).then((json) => {
      this.addMessage(json.data);
    });
  },
  addMessage(message) {
    this.messages.push(message);
  },
});

const ChatRoomsStore = types.model('ChatRoomsStore', {
  chatrooms: types.map(ChatRoom),
  isLoading: true,
}, {
  loadChatRooms() {
    fetchApi('/chats').then((json) => {
      console.log('Received chats : ', json);
      this.updateChatrooms(json.data);
      this.markLoading(false);
    })
    .catch((err) => {
      console.error('Failed to load Chatrooms ', err);
    });
  },
  markLoading(loading) {
    this.isLoading = loading;
  },
  updateChatrooms(data) {
    data.forEach((chatroom) => {
      this.chatrooms.put(ChatRoom.create(chatroom));
    });
  }
});

const chatRoomStore = ChatRoomsStore.create({ chatrooms: {} });

export default chatRoomStore;
