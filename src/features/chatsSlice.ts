import { createSlice } from '@reduxjs/toolkit';

interface chatsState {
  messages: any;
  activeUserData: any;
  currentMessage: any;
  mobileChatModal: boolean;
  allUnreadConversationMessagesCount: any;
  unreadConversationMessagesCount: any;
}

const initialState: chatsState = {
  messages: [],
  activeUserData: null,
  currentMessage: null,
  mobileChatModal: false,
  allUnreadConversationMessagesCount: null,
  unreadConversationMessagesCount: null,
};

export const chatsSlice = createSlice({
  name: `chats`,
  initialState,
  reducers: {
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    setActiveUserData: (state, action) => {
      state.activeUserData = action.payload;
    },
    setCurrentMessage: (state, action) => {
      state.currentMessage = action.payload;
    },
    setMobileChatModal: (state, action) => {
      state.mobileChatModal = action.payload;
    },
    setAllUnreadConversationMessagesCount: (state, action) => {
      state.allUnreadConversationMessagesCount = action.payload;
    },
    setUnreadConversationMessagesCount: (state, action) => {
      state.unreadConversationMessagesCount = action.payload;
    },
  },
});

export const {
  setMessages,
  setActiveUserData,
  setCurrentMessage,
  setMobileChatModal,
  setAllUnreadConversationMessagesCount,
  setUnreadConversationMessagesCount,
} = chatsSlice.actions;

export default chatsSlice.reducer;
