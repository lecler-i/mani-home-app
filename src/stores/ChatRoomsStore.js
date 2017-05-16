import { observable, action, computed } from 'mobx';

import fetchApi from '../utils/fetch';

class ChatRoomsStore {
  @observable chatrooms = [];
  @observable isLoading = false;

  @action
  async fetch() {
    this.isLoading = true;
    const { data } = await fetchApi('/chatrooms');
    this.chatrooms = data;
    this.isLoading = false;
  }
}

const chatRoomsStore = new ChatRoomsStore();

chatRoomsStore.chatrooms = [
  {
    id: 42,
    users: [
      {
        id: 1,
        name: 'Thomas LECLERCQ',
        picture: 'https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/1896846_225866990917076_9177983665082924448_n.jpg?oh=508244fcefd6f1c814e3fcedc5c2c2c1&oe=597C99E6',
      },
    ],
    messages: [
      {
        id: 1,
        createdAt: new Date(),
        text: 'POREMIER MESSAGE',
      },
      {
        id: 2,
        createdAt: new Date(),
        text: 'LALA MESSAGE',
      },
      {
        id: 3,
        createdAt: new Date(),
        text: '3ieme message',
      },
    ],
  },
];

// accommodationsStore.fetch();


export default chatRoomsStore;
