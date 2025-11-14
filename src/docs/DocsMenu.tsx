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
          <Link to="/docs/theme">ThemeSwitcher</Link>
        </li>
        <li>
          <Link to="/docs/datafield">DataField</Link>
        </li>
      </ul>
    </>
  );
};
