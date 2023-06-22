import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import FormContextProvider from "./Context/FormContext.tsx";
import SettingsContextProvider from "./Context/SettingsContext.tsx";
import { AuthContextprovider } from "./Context/AuthContext.tsx";
import "./main.css";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthContextprovider>
        <SettingsContextProvider>
          <FormContextProvider>
            <App />
          </FormContextProvider>
        </SettingsContextProvider>
      </AuthContextprovider>
    </QueryClientProvider>
  </React.StrictMode>
);
