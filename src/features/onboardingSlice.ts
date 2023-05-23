import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store/store';

interface onboardState {
  intro: boolean;
  userIntro: boolean;
  stepOne: boolean;
  stepTwo: boolean;
  stepThree: boolean;
}

const initialState: onboardState = {
  intro: true,
  userIntro: false,
  stepOne: false,
  stepTwo: false,
  stepThree: false,
};

export const onboardingSlice = createSlice({
  name: `onboarding`,
  initialState,
  reducers: {
    setIntro: (state, action) => {
      state.intro = action.payload;
    },
    setUserIntro: (state, action) => {
      state.intro = action.payload;
    },
    setIntroOne: (state, action) => {
      state.intro = action.payload;
    },
    setIntroTwo: (state, action) => {
      state.intro = action.payload;
    },
    setIntroThree: (state, action) => {
      state.intro = action.payload;
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
