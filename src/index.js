import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store, { persistor } from './components/redux/store';
import { PersistGate } from 'redux-persist/integration/react';


// Extiende el tema Chakra UI si es necesario
const theme = extendTheme({
  colors: {
    brand: {
      900: "#E5B9D7",
      800: "#88B9BF",
      700: "#2a69ac",
    },
  },
});

const root = document.getElementById('root');
ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ChakraProvider theme={theme}>
        <App  />
      </ChakraProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

// Mantén el código existente para reportWebVitals si lo necesitas
reportWebVitals();
