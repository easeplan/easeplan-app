import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  queryData: [],
  userRole:
    typeof window !== `undefined` ? localStorage.getItem(`userRole`) : ``,
  error: null,
  isLoading: false,
};

const userSlice = createSlice({
  name: `user`,
  initialState,
  reducers: {
    fetchUserRequest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchUserSuccess: (state, action) => {
      state.isLoading = false;
      state.queryData = action.payload;
    },
    fetchUserFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchUserRequest, fetchUserSuccess, fetchUserFailure } =
  userSlice.actions;

export default userSlice.reducer;
