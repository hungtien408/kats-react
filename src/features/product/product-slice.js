import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import productApi from 'api/product-api';

// async action
export const getProductList = createAsyncThunk('product/getList', async (params, thunkAPI) => {
  // thunkAPI.dispatch(): use to dispatch other action
  const response = await productApi.getAll(params);
  return response;
});

export const createProduct = createAsyncThunk('product/create', async (payload) => {
  const response = await productApi.post(payload);
  return response;
});

export const updateProduct = createAsyncThunk('product/update', async (payload) => {
  const response = await productApi.patch(payload);
  return response;
});

export const deleteProduct = createAsyncThunk('product/delete', async (id) => {
  const response = await productApi.delete(id);
  return response;
});

const product = createSlice({
  name: 'product',
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
  extraReducers: (builder) => {
    builder.addCase(getProductList.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getProductList.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    builder.addCase(getProductList.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload.data;
      state.pagination = action.payload.pagination;
    });
  },
});

const { reducer: productReducer, actions } = product;
export const { setFilter } = actions;
export default productReducer;
