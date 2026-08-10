import { Accordion, LinkButton, useLeftDrawer } from "../index";

interface MenuSection {
  title: string;
  icon: string;
  defaultOpen?: boolean;
  links: { to: string; label: string }[];
}

const MENU_SECTIONS: MenuSection[] = [
  {
    title: "Form Controls",
    icon: "fa-edit",
    defaultOpen: true,
    links: [
      { to: "/docs/button", label: "Button" },
      { to: "/docs/linkbutton", label: "LinkButton" },
      { to: "/docs/input", label: "Input" },
      { to: "/docs/autocomplete-input", label: "AutocompleteInput" },
      { to: "/docs/currency-input", label: "CurrencyInput" },
      { to: "/docs/search-select-input", label: "SearchSelectInput" },
      { to: "/docs/datepicker", label: "DatePicker" },
      { to: "/docs/dateinput", label: "DateInput" },
      { to: "/docs/checkbox", label: "Checkbox" },
      { to: "/docs/radiobuttongroup", label: "RadioButtonGroup" },
      { to: "/docs/pagination", label: "Pagination" },
    ],
  },
  {
    title: "Layout",
    icon: "fa-th-large",
    links: [
      { to: "/docs/card", label: "Card" },
      { to: "/docs/datafield", label: "DataField" },
      { to: "/docs/collection", label: "Collection" },
      { to: "/docs/tabsgroup", label: "TabsGroup" },
      { to: "/docs/datatable", label: "DataTable" },
      { to: "/docs/accordion", label: "Accordion" },
      { to: "/docs/menu", label: "Menu" },
      { to: "/docs/dropdownmenu", label: "DropdownMenu" },
      { to: "/docs/dropdownpanel", label: "DropdownPanel" },
      { to: "/docs/filter", label: "Filter" },
    ],
  },
  {
    title: "Utils",
    icon: "fa-tools",
    links: [
      { to: "/docs/badge", label: "Badge" },
      { to: "/docs/avatar", label: "Avatar" },
      { to: "/docs/roadmap", label: "RoadMap" },
      { to: "/docs/dialog", label: "Dialog" },
      { to: "/docs/loader", label: "Loader" },
      { to: "/docs/skeleton", label: "Skeleton" },
      { to: "/docs/snackbar", label: "Snackbar" },
      { to: "/docs/theme", label: "ThemeSwitcher" },
    ],
  },
  {
    title: "Contexts",
    icon: "fa-database",
    links: [
      { to: "/docs/auth", label: "AuthContext" },
      { to: "/docs/listcrud", label: "CrudContext" },
    ],
  },
  {
    title: "Templates",
    icon: "fa-file-alt",
    links: [
      { to: "/docs/templates/login-form", label: "LoginForm" },
      { to: "/docs/templates/registration-form", label: "RegistrationForm" },
      { to: "/docs/templates/contact-form", label: "ContactForm" },
      { to: "/docs/templates/dashboard-layout", label: "DashboardLayout" },
      { to: "/docs/templates/sidebar-layout", label: "SidebarLayout" },
      { to: "/docs/templates/form-pattern", label: "FormPattern" },
      { to: "/docs/templates/list-pattern", label: "ListPattern" },
    ],
  },
  {
    title: "Otros",
    icon: "fa-folder",
    links: [
      { to: "/docs/example-form", label: "Formulario de Ejemplo" },
      { to: "/docs/admin", label: "Admin (Mock Services)" },
    ],
  },
];

export const DocsMenu = () => {
  // Comando del AppLayout para cerrar el drawer izquierdo en móvil/tablet
  const { closeLeftDrawer } = useLeftDrawer();

  return (
    <div className="space-y-2 p-4 bg-gray-100 h-full">
      {MENU_SECTIONS.map((section) => (
        <Accordion
          key={section.title}
          title={section.title}
          icon={section.icon}
          defaultOpen={section.defaultOpen}
        >
          <div className="space-y-2">
            {section.links.map((link) => (
              <LinkButton
                key={link.to}
                to={link.to}
                variant="ghost"
                size="sm"
                className="w-full justify-start"
                color="secondary"
                onClick={closeLeftDrawer}
              >
                {link.label}
              </LinkButton>
            ))}
          </div>
        </Accordion>
      ))}
    </div>
  );
};
