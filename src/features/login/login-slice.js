import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import loginApi from 'api/login-api';
import { DEVICE_ID } from 'constants/global';

export const login = createAsyncThunk('login', async (payload) => {
  const response = await loginApi.post(payload);
  return response;
});

export const getUserMe = createAsyncThunk('getUserMe', async () => {
  const response = await loginApi.getUserMe();
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
    Name: '',
    Email: '',
    BusinessUnitIds: [],
    Permissions: [],
    UserRoles: [],
  },
  reducers: {},
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      const { AccessToken, RefreshToken } = action.payload;
      state.AccessToken = AccessToken;
      state.RefreshToken = RefreshToken;
    },
    [getUserMe.fulfilled]: (state, action) => {
      const { UserAccount } = action.payload;
      const { Name, Email, BusinessUnitIds, Permissions, UserRoles } = UserAccount;
      state.Name = Name;
      state.Email = Email;
      state.BusinessUnitIds = BusinessUnitIds;
      state.Permissions = Permissions;
      state.UserRoles = UserRoles;
    },
  },
});

const { reducer: authReducer } = auth;
export default authReducer;
