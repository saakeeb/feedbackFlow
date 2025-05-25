import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./contexts/AuthContext";
import { Toaster } from "react-hot-toast";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: "#fff",
              color: "#363636",
              borderRadius: "0.5rem",
              boxShadow:
                "0 4px 12px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.05)",
            },
            success: {
              iconTheme: {
                primary: "#10B981",
                secondary: "#ECFDF5",
              },
            },
            error: {
              iconTheme: {
                primary: "#EF4444",
                secondary: "#FEF2F2",
              },
            },
          }}
        />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
