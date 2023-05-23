import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store/store';

// Define a type for the slice state
interface AuthState {
  userInfo: {
    role: string;
    hasVisited: boolean;
    onboardStage: number;
    _id: string;
  } | null;
}

// Define the initial state using that type
const initialState: AuthState = {
  userInfo:
    typeof window !== `undefined` && localStorage.getItem(`userInfo`)
      ? JSON.parse(localStorage.getItem(`userInfo`)!)
      : null,
};

export const authSlice = createSlice({
  name: `auth`,
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem(`userInfo`, JSON.stringify(action.payload));
    },
    clearCredentials: (state, action) => {
      state.userInfo = null;
      localStorage.removeItem(`userInfor`);
    },
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload;
    // },
  },
});

export const { setCredentials, clearCredentials } = authSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;