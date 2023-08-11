import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: {
    name: {
      uk: 'Джон Доу',
      en: 'John Dou'
    }
  }
};

const profileSlice = createSlice({
  initialState,
  name:     'profile',
  reducers: {
    setProfileData(state, action) {
      state.data = action.payload;
    }
  }
});

export type IProfile = typeof initialState;
export default profileSlice.reducer;
export const { setProfileData } = profileSlice.actions;
