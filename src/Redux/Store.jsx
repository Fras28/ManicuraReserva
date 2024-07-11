import { configureStore } from '@reduxjs/toolkit';
import reservasReducer from './Slice.jsx'; // Asegúrate de ajustar la ruta correcta

const store = configureStore({
  reducer: {
    reservas: reservasReducer, // Agrega tu slice de reservas aquí
  },
});

export default store;