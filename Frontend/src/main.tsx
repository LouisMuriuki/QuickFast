import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import FormContextProvider from "./Context/FormContext.tsx";
import SettingsContextProvider from "./Context/SettingsContext.tsx";
import { AuthContextprovider } from "./Context/AuthContext.tsx";
import "./main.css"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AuthContextprovider>
      <SettingsContextProvider>
        <FormContextProvider>
          <App />
        </FormContextProvider>
      </SettingsContextProvider>
    </AuthContextprovider>
  </React.StrictMode>
);
