import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store/store';

// Define a type for the slice state
interface AuthState {
  userInfo: string | null;
  queryData: any;
}

// Define the initial state using that type
const initialState: AuthState = {
  userInfo: null,
  queryData: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setQueryData: (state, action) => {
      state.queryData = action.payload;
    },
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
    },
    clearCredentials: (state) => {
      state.userInfo = null;
    },
  },
});

export const { setQueryData, setCredentials, clearCredentials } =
  authSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;
