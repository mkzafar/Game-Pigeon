import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "./Pages/Home";
import AnagramSolver from "./Pages/AnagramSolver";
import WordHuntSolver from "./Pages/WordHunt";
import "./index.css"; // Tailwind styles

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/AnagramSolver" element={<AnagramSolver />} />
          <Route path="/WordHuntSolver" element={<WordHuntSolver />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  </React.StrictMode>
);
