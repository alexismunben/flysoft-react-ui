import { Link } from "react-router-dom";

export const DocsMenu = () => {
  return (
    <>
      <ul>
        <li>
          <Link to="/docs/button">Button</Link>
        </li>
        <li>
          <Link to="/docs/badge">Badge</Link>
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
          <Link to="/docs/datepicker">DatePicker</Link>
        </li>
        <li>
          <Link to="/docs/dateinput">DateInput</Link>
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
          <Link to="/docs/auth">AuthContext</Link>
        </li>
      </ul>
    </>
  );
};
