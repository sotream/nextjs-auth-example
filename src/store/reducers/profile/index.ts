import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {
    firstName: '',
    lastName:  '',
    username:  '',
    email:     '',
  }
};

const profileSlice = createSlice({
  initialState,
  name:     'profile',
  reducers: {
    setProfileData(state, action) {
      state.user = action.payload;
    }
  }
});

export type IProfile = typeof initialState;
export default profileSlice.reducer;
export const { setProfileData } = profileSlice.actions;
