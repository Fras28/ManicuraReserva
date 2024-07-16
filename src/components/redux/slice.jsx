import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  reservas: [],
  prestadores: [],
  user: null,
  token: null,
  comercio: null, // Nuevo estado para almacenar la información del comercio
  status: 'idle',
  error: null,
};

export const fetchPrestadores = createAsyncThunk('reservas/fetchPrestadores', async () => {
  try {
    const response = await axios.get('http://localhost:1337/api/prestadores?populate=avatar&populate=fondoPerfil&populate=valors');
    return response.data;
  } catch (error) {
    console.error('Error fetching prestadores:', error);
    throw error;
  }
});

export const fetchComercio = createAsyncThunk('reservas/fetchComercio', async () => {
  try {
    const response = await axios.get('http://localhost:1337/api/comercios/1');
    return response.data;
  } catch (error) {
    console.error('Error fetching prestadores:', error);
    throw error;
  }
});

export const fetchReservas = createAsyncThunk('reservas/fetchReservas', async () => {
  try {
    const response = await axios.get('http://localhost:1337/api/reservas?filters[comercio][id][$eq]=1&populate[prestador][fields][0]=nombre&populate[comercio][fields][0]=id');
    return response.data;
  } catch (error) {
    console.error('Error fetching reservas:', error);
    throw error;
  }
});

export const createReserva = createAsyncThunk('reservas/createReserva', async ({ nombreCliente, email, fecha, hora, prestador }, { dispatch }) => {
  try {
    const response = await axios.post('http://localhost:1337/api/reservas', {
      data: { nombreCliente, email, fecha, hora, prestador: { id: prestador }, comercio: { id: 1 } }
    });
    await dispatch(fetchReservas());
    return response.data;
  } catch (error) {
    console.error('Error creating reserva:', error);
    throw error;
  }
});

export const deleteReserva = createAsyncThunk('reservas/deleteReserva', async (id, { dispatch }) => {
  try {
    await axios.delete(`http://localhost:1337/api/reservas/${id}`);
    await dispatch(fetchReservas());
    return id;
  } catch (error) {
    console.error('Error deleting reserva:', error);
    throw error;
  }
});

export const registerUser = createAsyncThunk('user/register', async (userData) => {
  try {
    const response = await axios.post('http://localhost:1337/api/auth/local/register', userData);
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
});

export const loginUser = createAsyncThunk('user/login', async (credentials) => {
  try {
    const response = await axios.post('http://localhost:1337/api/auth/local', {
      identifier: credentials.email,
      password: credentials.password,
    });
    localStorage.setItem('token', response.data.jwt);
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
});

const removeToken = () => {
  localStorage.removeItem('token');
};

export const logoutUser = createAsyncThunk('user/logout', async () => {
  try {
    removeToken();
    return null;  // Puedes devolver cualquier dato que desees al completar el logout
  } catch (error) {
    console.error('Error logging out:', error);
    throw error;
  }
});

const reservasSlice = createSlice({
  name: 'reservas',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPrestadores.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPrestadores.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.prestadores = action.payload.data;
      })
      .addCase(fetchPrestadores.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchReservas.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchReservas.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.reservas = action.payload;
      })
      .addCase(fetchReservas.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createReserva.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createReserva.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(createReserva.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteReserva.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteReserva.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(deleteReserva.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.status = 'succeeded';
        // You might want to store the user data in your state here
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.token = action.payload.jwt;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(logoutUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.status = 'idle';
        state.user = null;
        state.token = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchComercio.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchComercio.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.comercio = action.payload; // Almacena la respuesta en el estado del comercio
      })
      .addCase(fetchComercio.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { logout } = reservasSlice.actions;

export default reservasSlice.reducer;
