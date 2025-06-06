import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../api/apiSlice';
import { userSlice } from './userSlice';
import { setupListeners } from '@reduxjs/toolkit/query';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    [userSlice.reducerPath]: userSlice.reducer,
  },

  middleware: (getDefaulltMiddleware) =>
    getDefaulltMiddleware().concat(apiSlice.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
