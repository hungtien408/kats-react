import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import loginApi from 'api/login-api';
import { DEVICE_ID } from 'constants/global';

export const login = createAsyncThunk('login', async (payload) => {
  const response = await loginApi.post(payload);
  return response;
});

const auth = createSlice({
  name: 'auth',
  initialState: {
    AccessToken: {
      ExpiresIn: NaN,
      Token: '',
    },
    RefreshToken: '',
    DeviceId: DEVICE_ID,
  },
  reducers: {},
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      const { AccessToken, RefreshToken } = action.payload;
      state.AccessToken = AccessToken;
      state.RefreshToken = RefreshToken;
    },
  },
});

const { reducer: authReducer } = auth;
export default authReducer;
