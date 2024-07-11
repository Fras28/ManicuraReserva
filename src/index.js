import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './Redux/Store';


// Extiende el tema Chakra UI si es necesario
const theme = extendTheme({
  colors: {
    brand: {
      900: "#1a365d",
      800: "#153e75",
      700: "#2a69ac",
    },
  },
});

const root = document.getElementById('root');
ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </Provider>
  </React.StrictMode>
);

// Mantén el código existente para reportWebVitals si lo necesitas
reportWebVitals();
