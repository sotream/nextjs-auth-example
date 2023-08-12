import { createSelector } from '@reduxjs/toolkit';

import { TStoreState } from '../../types/store';

export const selectSettings = (state: TStoreState) => state.settings;
export const selectCurrentTheme = createSelector(
  selectSettings,
  (settings) => settings.currentTheme
);
