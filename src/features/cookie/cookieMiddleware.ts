import { useDispatch } from 'react-redux';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { setToken, clearToken } from './cookieSlice';

interface CookieResponse {
  token: string;
}

export const fetchToken = createAsyncThunk<CookieResponse>(
  `cookie/fetchToken`,
  async () => {
    const dispatch = useDispatch();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_NEXT_API}/api/cookie`,
    );
    const data = await response.json();
    dispatch(setToken(data));

    return data;
  },
);

export const setTokenAsync = createAsyncThunk<void, string>(
  `cookie/setTokenAsync`,
  async (token) => {
    await fetch(`${process.env.NEXT_PUBLIC_NEXT_API}/api/cookie`, {
      method: `POST`,
      headers: {
        'Content-Type': `application/json`,
      },
      body: JSON.stringify({ token }),
    });
  },
);

export const clearTokenAsync = createAsyncThunk<void>(
  `cookie/clearTokenAsync`,
  async () => {
    await fetch(`${process.env.NEXT_PUBLIC_NEXT_API}/api/cookie`, {
      method: `DELETE`,
    });
  },
);
