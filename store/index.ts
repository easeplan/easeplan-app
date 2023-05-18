import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userSlider from '@/features/users/userSlice';
import cookieSlice from '@/features/cookie/cookieSlice';
import { createWrapper } from 'next-redux-wrapper';

const makeStore = () => {
  configureStore({
    reducer: {
      user: userSlider,
      cookie: cookieSlice,
    },
    devTools: process.env.NODE_ENV !== `production`,
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;

export const wrapper = createWrapper<AppStore>(makeStore);
