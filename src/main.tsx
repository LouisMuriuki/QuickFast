import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import FormContextProvider from "./Context/FormContext.tsx";
import SettingsContextProvider from "./Context/SettingsContext.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <SettingsContextProvider>
      <FormContextProvider>
        <App />
      </FormContextProvider>
    </SettingsContextProvider>
  </React.StrictMode>
);
