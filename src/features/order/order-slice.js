import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import orderApi from 'api/order-api';

export const getOrderList = createAsyncThunk('order/getList', async (params) => {
  const response = await orderApi.getAll(params);
  return response;
});

const order = createSlice({
  name: 'order',
  initialState: {
    loading: false,
    list: [],
    filter: {
      PageIndex: 0,
      PageSize: 20,
    },
    pagination: {
      PageIndex: 1,
      PageSize: 20,
      TotalCount: 15,
    },
  },
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
      state.pagination = { ...state.pagination, PageIndex: action.payload.PageIndex + 1 };
    },
  },
  extraReducers: {
    [getOrderList.fulfilled]: (state, action) => {
      const { Orders, TotalCount } = action.payload;
      state.list = Orders;
      state.pagination = { ...state.pagination, TotalCount };
    },
  },
});

const { reducer: orderReducer, actions } = order;
export const { setFilter } = actions;
export default orderReducer;
