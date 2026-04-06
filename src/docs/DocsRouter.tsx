import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ButtonDocs from "./ButtonDocs";
import LinkButtonDocs from "./LinkButtonDocs";
import CardDocs from "./CardDocs";
import InputDocs from "./InputDocs";
import ThemeSwitcherDocs from "./ThemeSwitcherDocs";
import BadgeDocs from "./BadgeDocs";
import AvatarDocs from "./AvatarDocs";
import RoadMapDocs from "./RoadMapDocs";
import DataFieldDocs from "./DataFieldDocs";
import AutocompleteInputDocs from "./AutocompleteInputDocs";
import SearchSelectInputDocs from "./SearchSelectInputDocs";
import DatePickerDocs from "./DatePickerDocs";
import DateInputDocs from "./DateInputDocs";
import TabsGroupDocs from "./TabsGroupDocs";
import DialogDocs from "./DialogDocs";
import PaginationDocs from "./PaginationDocs";
import LoaderDocs from "./LoaderDocs";
import DataTableDocs from "./DataTableDocs";
import DropdownMenuDocs from "./DropdownMenuDocs";
import DropdownPanelDocs from "./DropdownPanelDocs";
import FilterDocs from "./FilterDocs";
import { AuthDocs } from "./AuthDocs.tsx/AuthDocs";
import { ListCrudDocs } from "./ListCrudDocs.tsx/ListCrudDocs";
import ExampleFormDocs from "./ExampleFormDocs";
import CheckboxDocs from "./CheckboxDocs";
import RadioButtonGroupDocs from "./RadioButtonGroupDocs";
import MenuDocs from "./MenuDocs";
import SnackbarDocs from "./SnackbarDocs";
import AccordionDocs from "./AccordionDocs";
import SkeletonDocs from "./SkeletonDocs";
import CurrencyInputDocs from "./CurrencyInputDocs";
import DocAdmin from "./DocAdmin";
import LoginFormDocs from "./LoginFormDocs";
import RegistrationFormDocs from "./RegistrationFormDocs";
import ContactFormDocs from "./ContactFormDocs";
import DashboardLayoutDocs from "./DashboardLayoutDocs";
import SidebarLayoutDocs from "./SidebarLayoutDocs";
import FormPatternDocs from "./FormPatternDocs";
import ListPatternDocs from "./ListPatternDocs";

export const DocsRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="" element={<Navigate to="button" replace />} />
      <Route path="button" element={<ButtonDocs />} />
      <Route path="linkbutton" element={<LinkButtonDocs />} />
      <Route path="badge" element={<BadgeDocs />} />
      <Route path="avatar" element={<AvatarDocs />} />
      <Route path="roadmap" element={<RoadMapDocs />} />
      <Route path="card" element={<CardDocs />} />
      <Route path="input" element={<InputDocs />} />
      <Route path="autocomplete-input" element={<AutocompleteInputDocs />} />
      <Route path="search-select-input" element={<SearchSelectInputDocs />} />
      <Route path="datepicker" element={<DatePickerDocs />} />
      <Route path="dateinput" element={<DateInputDocs />} />
      <Route path="checkbox" element={<CheckboxDocs />} />
      <Route path="radiobuttongroup" element={<RadioButtonGroupDocs />} />
      <Route path="currency-input" element={<CurrencyInputDocs />} />
      <Route path="theme" element={<ThemeSwitcherDocs />} />
      <Route path="datafield" element={<DataFieldDocs />} />
      <Route path="tabsgroup" element={<TabsGroupDocs />} />
      <Route path="dialog" element={<DialogDocs />} />
      <Route path="pagination" element={<PaginationDocs />} />
      <Route path="loader" element={<LoaderDocs />} />
      <Route path="datatable" element={<DataTableDocs />} />
      <Route path="dropdownmenu" element={<DropdownMenuDocs />} />
      <Route path="dropdownpanel" element={<DropdownPanelDocs />} />
      <Route path="filter" element={<FilterDocs />} />
      <Route path="auth" element={<AuthDocs />} />
      <Route path="listcrud/empresa/:id" element={<ListCrudDocs />} />
      <Route path="listcrud" element={<ListCrudDocs />} />
      <Route path="example-form" element={<ExampleFormDocs />} />
      <Route path="menu" element={<MenuDocs />} />
      <Route path="snackbar" element={<SnackbarDocs />} />
      <Route path="accordion" element={<AccordionDocs />} />
      <Route path="skeleton" element={<SkeletonDocs />} />
      <Route path="templates/login-form" element={<LoginFormDocs />} />
      <Route path="templates/registration-form" element={<RegistrationFormDocs />} />
      <Route path="templates/contact-form" element={<ContactFormDocs />} />
      <Route path="templates/dashboard-layout" element={<DashboardLayoutDocs />} />
      <Route path="templates/sidebar-layout" element={<SidebarLayoutDocs />} />
      <Route path="templates/form-pattern" element={<FormPatternDocs />} />
      <Route path="templates/list-pattern" element={<ListPatternDocs />} />
      <Route path="admin" element={<DocAdmin />} />
    </Routes>
  );
};

export default DocsRouter;
