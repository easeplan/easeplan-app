import { createSlice } from '@reduxjs/toolkit';

interface chatsState {
  messages: any;
  activeUserData: any;
  currentMessage: any;
  mobileChatModal: boolean;
  allUnreadConversationMessagesCount: any;
}

const initialState: chatsState = {
  messages: [],
  activeUserData: null,
  currentMessage: null,
  mobileChatModal: false,
  allUnreadConversationMessagesCount: null,
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
  },
});

export const {
  setMessages,
  setActiveUserData,
  setCurrentMessage,
  setMobileChatModal,
  setAllUnreadConversationMessagesCount,
} = chatsSlice.actions;

export default chatsSlice.reducer;
