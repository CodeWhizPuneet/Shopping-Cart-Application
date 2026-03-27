import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import App from "./App";
import { store } from "./store/store";
import "./styles.css";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0b5ed7"
    },
    secondary: {
      main: "#198754"
    },
    background: {
      default: "#f4f7fb"
    }
  },
  typography: {
    fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif"
  }
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
