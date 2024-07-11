import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/react';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './components/redux/store';

import { Provider } from "react-redux";
import { extendTheme, ChakraProvider, theme } from "@chakra-ui/react";
import { store } from "./Redux/Store";

// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
};

const root = ReactDOM.createRoot(document.getElementById("root"));
// Utiliza createRoot en lugar de ReactDOM.render
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </Provider>
  </React.StrictMode>
  <ChakraProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </ChakraProvider>
);

// Mantén el código existente para reportWebVitals si lo necesitas
reportWebVitals();
