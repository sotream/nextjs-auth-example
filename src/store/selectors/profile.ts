import { createSelector } from '@reduxjs/toolkit';

import { TStoreState } from '../../types/store';

export const selectProfile = (state: TStoreState) => state.profile;
export const selectProfileData = createSelector(selectProfile, (profile) => profile.data);
