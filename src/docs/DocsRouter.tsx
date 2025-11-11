import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ButtonDocs from "./ButtonDocs";
import CardDocs from "./CardDocs";
import InputDocs from "./InputDocs";
import ThemeSwitcherDocs from "./ThemeSwitcherDocs";

export const DocsRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="" element={<Navigate to="button" replace />} />
      <Route path="button" element={<ButtonDocs />} />
      <Route path="card" element={<CardDocs />} />
      <Route path="input" element={<InputDocs />} />
      <Route path="theme" element={<ThemeSwitcherDocs />} />
    </Routes>
  );
};

export default DocsRouter;
