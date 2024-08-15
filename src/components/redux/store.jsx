import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import reservasReducer from './slice';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['status', 'error'] // opcional: estados que no quieres persistir
};

const persistedReducer = persistReducer(persistConfig, reservasReducer);

const store = configureStore({
  reducer: {
    reservas: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export const persistor = persistStore(store);

export default store;