import { AnyAction, configureStore, Reducer } from '@reduxjs/toolkit';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import { nextReduxCookieMiddleware, wrapMakeStore } from 'next-redux-cookie-wrapper';
import combinedReducer from './reducers';

const reducer: Reducer<ReturnType<typeof combinedReducer>, AnyAction> = (state, action) => {
  if (action.type === HYDRATE) {
    return {
      ...state, // use previous state
      ...action.payload // apply delta from hydration
    };
  }

  return combinedReducer(state, action);
};

export const makeStore = wrapMakeStore(() => {
  return configureStore({
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false
      }).concat([
        nextReduxCookieMiddleware({
          subtrees: []
        })
      ]),
    reducer
  });
});

export type IStore = ReturnType<typeof makeStore>

export const reduxWrapper = createWrapper(makeStore, { debug: false });
