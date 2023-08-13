import { createSlice } from '@reduxjs/toolkit';
import { Theme } from 'react-toastify';

const initialState = {
  currentTheme: 'light' as Theme,
  isMobile:     true,
  appVersion:   '0.0.0'
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
    },
    setAppVersion(state, action) {
      state.appVersion = action.payload;
    }
  }
});

export type ISettings = typeof initialState;
export default settingsSlice.reducer;
export const { setCurrentTheme, setIsMobile, setAppVersion } = settingsSlice.actions;
