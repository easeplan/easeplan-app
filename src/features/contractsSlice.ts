import { createSlice } from '@reduxjs/toolkit';

interface notifyState {
  notifyData: any;
}

const initialState: notifyState = {
  notifyData: null,
};

export const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setNotifyData: (state, action) => {
      state.notifyData = action.payload;
    },
  },
});

export const { setNotifyData } = notificationsSlice.actions;

export default notificationsSlice.reducer;
