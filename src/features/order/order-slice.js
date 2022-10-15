import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import orderApi from 'api/order-api';

export const getOrderList = createAsyncThunk('order/getList', async (queryString) => {
  const response = await orderApi.getAll(queryString);
  return response;
});

const order = createSlice({
  name: 'order',
  initialState: {
    loading: false,
    search: '',
    pageIndex: 0,
    pageSize: 20,
    totalCount: 0,
    items: [],
    filters: [],
  },
  reducers: {
    setPage: (state, action) => {
      state.pageIndex = action.payload;
    },
    setFilter: (state, action) => {
      state.filters = action.payload;
    },
  },
  extraReducers: {
    [getOrderList.fulfilled]: (state, action) => {
      const { Orders, TotalCount } = action.payload;
      state.items = Orders;
      state.totalCount = TotalCount;
    },
  },
});

const { reducer: orderReducer, actions } = order;
export const { setFilter, setPage } = actions;
export default orderReducer;
