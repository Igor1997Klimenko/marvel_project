import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, } from 'redux-persist';
import authSlice from './auth/auth-slice';
import storage from 'redux-persist/lib/storage';
import persistReducer from 'redux-persist/lib/persistReducer';
import persistStore from 'redux-persist/es/persistStore';

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'],
}

export const store = configureStore({
  reducer: {
    auth: persistReducer(authPersistConfig, authSlice),
  },
  middleware: getDefaultMiddleware => [
    ...getDefaultMiddleware({
        serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  ],
});

setupListeners(store.dispatch)
export const persistor = persistStore(store);