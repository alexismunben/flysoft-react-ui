import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ButtonDocs from "./ButtonDocs";
import CardDocs from "./CardDocs";
import InputDocs from "./InputDocs";
import ThemeSwitcherDocs from "./ThemeSwitcherDocs";
import BadgeDocs from "./BadgeDocs";
import DataFieldDocs from "./DataFieldDocs";
import AutocompleteInputDocs from "./AutocompleteInputDocs";
import DatePickerDocs from "./DatePickerDocs";
import DateInputDocs from "./DateInputDocs";
import TabsGroupDocs from "./TabsGroupDocs";
import DialogDocs from "./DialogDocs";
import PaginationDocs from "./PaginationDocs";
import LoaderDocs from "./LoaderDocs";
import { AuthDocs } from "./AuthDocs.tsx/AuthDocs";

export const DocsRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="" element={<Navigate to="button" replace />} />
      <Route path="button" element={<ButtonDocs />} />
      <Route path="badge" element={<BadgeDocs />} />
      <Route path="card" element={<CardDocs />} />
      <Route path="input" element={<InputDocs />} />
      <Route path="autocomplete-input" element={<AutocompleteInputDocs />} />
      <Route path="datepicker" element={<DatePickerDocs />} />
      <Route path="dateinput" element={<DateInputDocs />} />
      <Route path="theme" element={<ThemeSwitcherDocs />} />
      <Route path="datafield" element={<DataFieldDocs />} />
      <Route path="tabsgroup" element={<TabsGroupDocs />} />
      <Route path="dialog" element={<DialogDocs />} />
      <Route path="pagination" element={<PaginationDocs />} />
      <Route path="loader" element={<LoaderDocs />} />
      <Route path="auth" element={<AuthDocs />} />
    </Routes>
  );
};

export default DocsRouter;
