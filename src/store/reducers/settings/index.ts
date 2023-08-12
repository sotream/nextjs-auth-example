import { createSlice } from '@reduxjs/toolkit';
import { Theme } from 'react-toastify';

const initialState = {
  currentTheme: 'light' as Theme,
  isMobile:     false
};

const settingsSlice = createSlice({
  initialState,
  name:     'settings',
  reducers: {
    setCurrentTheme(state, action) {
      state.currentTheme = action.payload || 'light';
    },
    setIsMobile(state, action) {
      state.isMobile = action.payload;
    }
  }
});

export type ISettings = typeof initialState;
export default settingsSlice.reducer;
export const { setCurrentTheme, setIsMobile } = settingsSlice.actions;
