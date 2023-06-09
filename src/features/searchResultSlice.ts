import { createSlice } from '@reduxjs/toolkit';

interface modalState {
  openSearchModal: boolean;
  closeSearchModal: boolean;
  data: any;
  planData?: {
    state?: string;
    role?: string;
    profileId?: string;
    city?: string;
    dateTime?: string;
    budget?: string;
    package?: any;
  };
  loadingResult: boolean;
  errorMsg: any;
}

const initialState: modalState = {
  openSearchModal: false,
  closeSearchModal: false,
  data: null,
  planData: {},
  loadingResult: false,
  errorMsg: null,
};

export const searchResultSlice = createSlice({
  name: `openSearchModal`,
  initialState,
  reducers: {
    setOpenSearchModal: (state, action) => {
      state.openSearchModal = action.payload;
    },
    setUpdateData: (state, action) => {
      state.data = action.payload;
    },
    setLoadingResult: (state, action) => {
      state.loadingResult = action.payload;
    },
    setErrorMsg: (state, action) => {
      state.errorMsg = action.payload;
    },
    setPlanData: (state, action) => {
      state.planData = action.payload;
    },
  },
});

export const {
  setOpenSearchModal,
  setLoadingResult,
  setUpdateData,
  setErrorMsg,
  setPlanData,
} = searchResultSlice.actions;

export default searchResultSlice.reducer;
