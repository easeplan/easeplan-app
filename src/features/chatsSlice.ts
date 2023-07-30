import { createSlice } from '@reduxjs/toolkit';

interface chatsState {
  messages: any;
  activeUserData: any;
  currentMessage: any;
}

const initialState: chatsState = {
  messages: [],
  activeUserData: null,
  currentMessage: null,
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
  },
});

export const { setMessages, setActiveUserData, setCurrentMessage } =
  chatsSlice.actions;

export default chatsSlice.reducer;
