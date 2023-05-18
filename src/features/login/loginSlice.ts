import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  error: null,
  isLoading: false,
};

const loginSlice = createSlice({
  name: `login`,
  initialState,
  reducers: {
    loginRequest: (state) => {
      (state.isLoading = true), (state.error = null);
    },
    loginSuccess: (state, action) => {
      (state.user = action.payload), (state.isLoading = false);
    },
    loginFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { loginRequest, loginSuccess, loginFailure } = loginSlice.actions;

export default loginSlice.reducer;
