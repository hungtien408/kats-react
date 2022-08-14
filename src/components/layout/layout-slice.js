import { createSlice } from '@reduxjs/toolkit';

const layout = createSlice({
  name: 'layout',
  initialState: {
    showSidebar: false,
  },
  reducers: {
    toggleSidebar: (state, action) => {
      state.showSidebar = !state.showSidebar;
    },
  },
});

const { reducer: layoutReducer, actions } = layout;
export const { toggleSidebar } = actions;
export default layoutReducer;
