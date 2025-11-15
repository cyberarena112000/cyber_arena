// src/main.tsx
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";            // <-- IMPORTANT: Tailwind CSS import

createRoot(document.getElementById("root")!).render(<App />);
