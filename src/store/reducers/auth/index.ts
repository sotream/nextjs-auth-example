import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  access_token:  null,
  refresh_token: null,
};

const authSlice = createSlice({
  initialState,
  name:     'auth',
  reducers: {
    setAccessToken(state, action) {
      state.access_token = action.payload;
    },
    setRefreshToken(state, action) {
      state.refresh_token = action.payload;
    }
  }
});

export type IProfile = typeof initialState;
export default authSlice.reducer;
export const { setAccessToken, setRefreshToken } = authSlice.actions;
