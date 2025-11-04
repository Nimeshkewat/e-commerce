import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import AppContextProvider from "./context/AppContextProvider.jsx";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppContextProvider>
      <BrowserRouter>
        <App />
        <ToastContainer autoClose="3000" position="top-center" />
      </BrowserRouter>
    </AppContextProvider>
  </StrictMode>
);
