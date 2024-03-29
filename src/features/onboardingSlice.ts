import { createSlice } from '@reduxjs/toolkit';

interface onboardState {
  intro: boolean;
  userIntro: boolean;
  stepOne: boolean;
  stepTwo: boolean;
  stepThree: boolean;
  stepFour: boolean;
  isLogin: boolean;
  closeModal: boolean;
}

const initialState: onboardState = {
  intro: true,
  userIntro: false,
  stepOne: false,
  stepTwo: false,
  stepThree: false,
  stepFour: false,
  isLogin: true,
  closeModal: true,
};

export const onboardingSlice = createSlice({
  name: `onboarding`,
  initialState,
  reducers: {
    setIntro: (state, action) => {
      state.intro = action.payload;
    },
    setUserIntro: (state, action) => {
      state.userIntro = action.payload;
    },
    setIntroOne: (state, action) => {
      state.stepOne = action.payload;
    },
    setIntroTwo: (state, action) => {
      state.stepTwo = action.payload;
    },
    setIntroThree: (state, action) => {
      state.stepThree = action.payload;
    },
    setIntroFour: (state, action) => {
      state.stepFour = action.payload;
    },
    isLogin: (state, action) => {
      state.isLogin = action.payload;
    },
    setCloseModal: (state, action) => {
      state.closeModal = action.payload;
    },
  },
});

export const {
  setIntro,
  setUserIntro,
  setIntroOne,
  setIntroTwo,
  setIntroThree,
  setIntroFour,
  isLogin,
  setCloseModal,
} = onboardingSlice.actions;

export default onboardingSlice.reducer;
