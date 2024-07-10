import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './Slice' // Ajusta la ruta según sea necesario

export const store = configureStore({
  reducer: {  
    allData: counterReducer,
  },
})
