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
      _page: 1,
      _limit: 20,
      _sort: 'createdDate',
      _order: 'DESC',
    },
    pagination: {
      _page: 1,
      _limit: 15,
      _totalRows: 15,
    },
  },
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: {
    [getOrderList.fulfilled]: (state, action) => {
      const { Orders, TotalCount } = action.payload;
      state.list = Orders;
      state.pagination = { ...state.pagination, _totalRows: TotalCount };
    },
  },
});

const { reducer: orderReducer, actions } = order;
export const { setFilter } = actions;
export default orderReducer;
