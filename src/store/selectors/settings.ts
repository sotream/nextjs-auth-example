import { createSelector } from '@reduxjs/toolkit';

import { TStoreState } from '../../types/store';

export const selectSettings = (state: TStoreState) => state.settings;

export const selectCurrentTheme = createSelector(
  selectSettings,
  (settings) => settings.currentTheme
);

export const selectIsMobile = createSelector(
  selectSettings,
  (settings) => settings.isMobile
);

export const selectAppVersion = createSelector(
  selectSettings,
  (settings) => settings.appVersion
);
