import { configureStore } from '@reduxjs/toolkit';
import layoutReducer from 'components/layout/layout-slice';
import authReducer from 'features/login/login-slice';
import orderReducer from 'features/order/order-slice';
import productReducer from 'features/product/product-slice';
import logger from 'redux-logger';

const rootReducer = {
  layout: layoutReducer,
  auth: authReducer,
  product: productReducer,
  order: orderReducer,
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
