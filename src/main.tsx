import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { SiteConfigProvider } from "./config/siteConfig";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SiteConfigProvider>
      <App />
    </SiteConfigProvider>
  </StrictMode>
);
