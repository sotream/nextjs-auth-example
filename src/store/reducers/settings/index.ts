import { createSlice } from '@reduxjs/toolkit';
import { Theme } from 'react-toastify';

const initialState = {
  currentTheme: 'light' as Theme
};

const settingsSlice = createSlice({
  initialState,
  name:     'settings',
  reducers: {
    setCurrentTheme(state, action) {
      state.currentTheme = action.payload || 'light';
    }
  }
});

export type ISettings = typeof initialState;
export default settingsSlice.reducer;
export const { setCurrentTheme } = settingsSlice.actions;
