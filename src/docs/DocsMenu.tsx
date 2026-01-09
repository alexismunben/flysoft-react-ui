import { Link } from "react-router-dom";

export const DocsMenu = () => {
  return (
    <>
      <ul className="px-4">
        <li>
          <Link to="/docs/button">Button</Link>
        </li>
        <li>
          <Link to="/docs/badge">Badge</Link>
        </li>
        <li>
          <Link to="/docs/avatar">Avatar</Link>
        </li>
        <li>
          <Link to="/docs/roadmap">RoadMap</Link>
        </li>
        <li>
          <Link to="/docs/card">Card</Link>
        </li>
        <li>
          <Link to="/docs/input">Input</Link>
        </li>
        <li>
          <Link to="/docs/autocomplete-input">AutocompleteInput</Link>
        </li>
        <li>
          <Link to="/docs/search-select-input">SearchSelectInput</Link>
        </li>
        <li>
          <Link to="/docs/datepicker">DatePicker</Link>
        </li>
        <li>
          <Link to="/docs/dateinput">DateInput</Link>
        </li>
        <li>
          <Link to="/docs/checkbox">Checkbox</Link>
        </li>
        <li>
          <Link to="/docs/radiobuttongroup">RadioButtonGroup</Link>
        </li>
        <li>
          <Link to="/docs/theme">ThemeSwitcher</Link>
        </li>
        <li>
          <Link to="/docs/datafield">DataField</Link>
        </li>
        <li>
          <Link to="/docs/tabsgroup">TabsGroup</Link>
        </li>
        <li>
          <Link to="/docs/dialog">Dialog</Link>
        </li>
        <li>
          <Link to="/docs/pagination">Pagination</Link>
        </li>
        <li>
          <Link to="/docs/loader">Loader</Link>
        </li>
        <li>
          <Link to="/docs/datatable">DataTable</Link>
        </li>
        <li>
          <Link to="/docs/dropdownmenu">DropdownMenu</Link>
        </li>
        <li>
          <Link to="/docs/filter">Filter</Link>
        </li>
        <li>
          <Link to="/docs/auth">AuthContext</Link>
        </li>
        <li>
          <Link to="/docs/listcrud">ListCrudContext</Link>
        </li>
        <li>
          <Link to="/docs/example-form">Formulario de Ejemplo</Link>
        </li>
        <li>
          <Link to="/docs/snackbar">Snackbar</Link>
        </li>
        <li>
          <Link to="/docs/admin">Admin (Mock Services)</Link>
        </li>
      </ul>
    </>
  );
};
