import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store/store';

// Define a type for the slice state
interface AuthState {
  userInfo: {
    role: string;
    hasVisited: boolean;
    onboardStage: number;
    _id: string;
  } | null;
  queryData: any;
}

// Define the initial state using that type
const getInitialUserInfo = () => {
  if (typeof window !== `undefined`) {
    const userInfoString = localStorage.getItem(`token`);
    try {
      // Safely attempt to parse the user info, if it exists.
      return userInfoString !== null ? JSON.parse(userInfoString) : null;
    } catch (error) {
      // If an error occurs during parsing, it's likely invalid JSON,
      // so we'll consider the user info to be null in this case.
      console.error(`Failed to parse userInfo:`, error);
      return null;
    }
  }
  return null;
};

const initialState: AuthState = {
  userInfo: getInitialUserInfo(),
  queryData: null,
};

export const authSlice = createSlice({
  name: `auth`,
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setQueryData: (state, action) => {
      state.queryData = action.payload;
    },
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem(`token`, JSON.stringify(action.payload));
    },
    clearCredentials: (state) => {
      state.userInfo = null;
      localStorage.clear();
    },
  },
});

export const { setQueryData, setCredentials, clearCredentials } =
  authSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;
