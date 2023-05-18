import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CookieState {
  token: string | null;
}

const initialState: CookieState = {
  token: null,
};

const cookieSlice = createSlice({
  name: `cookie`,
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    clearToken: (state) => {
      state.token = null;
    },
  },
});

export const { setToken, clearToken } = cookieSlice.actions;

export default cookieSlice.reducer;
