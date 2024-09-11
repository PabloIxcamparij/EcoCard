import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AppRouter from "./router";
import "./index.css";
import { NextUIProvider } from '@nextui-org/react';

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <NextUIProvider>
      <AppRouter />
    </NextUIProvider>
  </StrictMode>
);
