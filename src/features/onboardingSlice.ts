import { createSlice } from '@reduxjs/toolkit';

interface onboardState {
  intro: boolean;
  userIntro: boolean;
  stepOne: boolean;
  stepTwo: boolean;
  stepThree: boolean;
}

const initialState: onboardState = {
  intro: false,
  userIntro: false,
  stepOne: false,
  stepTwo: false,
  stepThree: true,
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
  },
});

export const {
  setIntro,
  setUserIntro,
  setIntroOne,
  setIntroTwo,
  setIntroThree,
} = onboardingSlice.actions;

export default onboardingSlice.reducer;
