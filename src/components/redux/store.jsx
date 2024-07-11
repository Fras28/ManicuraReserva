// store.js
import { configureStore } from '@reduxjs/toolkit';
import reservasReducer from './slice';

const store = configureStore({
  reducer: {
    reservas: reservasReducer,
  },
});

export default store;
