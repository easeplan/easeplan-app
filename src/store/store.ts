import notificationSlice from '@/features/notificationsSlice';
import { configureStore } from '@reduxjs/toolkit';
import authSlice from '@/features/authSlice';
import onboardingSlice from '@/features/onboardingSlice';
import chatsSlice from '@/features/chatsSlice';
import { apiSlice } from '@/features/apiSlice';
import searchResultSlice from '@/features/searchResultSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    onboarding: onboardingSlice,
    notifications: notificationSlice,
    chatsData: chatsSlice,
    searchModal: searchResultSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: process.env.NODE_ENV !== 'production',
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
