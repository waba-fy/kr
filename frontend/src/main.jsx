import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import App from "./App";
import { ManagedContentContext } from "./hooks/ManagedContentContext";
const initialContent = JSON.parse(document.getElementById("kr-public-content")?.textContent || "{}");
import "./styles/global.css";
import "./styles/mobile-layout.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        
          <ManagedContentContext.Provider value={initialContent}><App /></ManagedContentContext.Provider>
       
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
);