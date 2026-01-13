import { Accordion, LinkButton } from "../index";

export const DocsMenu = () => {
  return (
    <div className="space-y-2 p-4 bg-gray-100 h-full">
      <Accordion title="Form Controls" icon="fa-edit" defaultOpen>
        <div className="space-y-2">
          <LinkButton
            to="/docs/button"
            variant="ghost"
            size="sm"
            className="w-full justify-start"
            color="secondary"
          >
            Button
          </LinkButton>
          <LinkButton
            to="/docs/linkbutton"
            variant="ghost"
            size="sm"
            className="w-full justify-start"
            color="secondary"
          >
            LinkButton
          </LinkButton>
          <LinkButton
            to="/docs/input"
            variant="ghost"
            size="sm"
            className="w-full justify-start"
            color="secondary"
          >
            Input
          </LinkButton>
          <LinkButton
            to="/docs/autocomplete-input"
            variant="ghost"
            size="sm"
            className="w-full justify-start"
            color="secondary"
          >
            AutocompleteInput
          </LinkButton>
          <LinkButton
            to="/docs/search-select-input"
            variant="ghost"
            size="sm"
            className="w-full justify-start"
            color="secondary"
          >
            SearchSelectInput
          </LinkButton>
          <LinkButton
            to="/docs/datepicker"
            variant="ghost"
            size="sm"
            className="w-full justify-start"
            color="secondary"
          >
            DatePicker
          </LinkButton>
          <LinkButton
            to="/docs/dateinput"
            variant="ghost"
            size="sm"
            className="w-full justify-start"
            color="secondary"
          >
            DateInput
          </LinkButton>
          <LinkButton
            to="/docs/checkbox"
            variant="ghost"
            size="sm"
            className="w-full justify-start"
            color="secondary"
          >
            Checkbox
          </LinkButton>
          <LinkButton
            to="/docs/radiobuttongroup"
            variant="ghost"
            size="sm"
            className="w-full justify-start"
            color="secondary"
          >
            RadioButtonGroup
          </LinkButton>
          <LinkButton
            to="/docs/pagination"
            variant="ghost"
            size="sm"
            className="w-full justify-start"
            color="secondary"
          >
            Pagination
          </LinkButton>
        </div>
      </Accordion>

      <Accordion title="Layout" icon="fa-th-large">
        <div className="space-y-2">
          <LinkButton
            to="/docs/card"
            variant="ghost"
            size="sm"
            className="w-full justify-start"
            color="secondary"
          >
            Card
          </LinkButton>
          <LinkButton
            to="/docs/datafield"
            variant="ghost"
            size="sm"
            className="w-full justify-start"
            color="secondary"
          >
            DataField
          </LinkButton>
          <LinkButton
            to="/docs/tabsgroup"
            variant="ghost"
            size="sm"
            className="w-full justify-start"
            color="secondary"
          >
            TabsGroup
          </LinkButton>
          <LinkButton
            to="/docs/datatable"
            variant="ghost"
            size="sm"
            className="w-full justify-start"
            color="secondary"
          >
            DataTable
          </LinkButton>
          <LinkButton
            to="/docs/accordion"
            variant="ghost"
            size="sm"
            className="w-full justify-start"
            color="secondary"
          >
            Accordion
          </LinkButton>
        </div>
      </Accordion>

      <Accordion title="Utils" icon="fa-tools">
        <div className="space-y-2">
          <LinkButton
            to="/docs/badge"
            variant="ghost"
            size="sm"
            className="w-full justify-start"
            color="secondary"
          >
            Badge
          </LinkButton>
          <LinkButton
            to="/docs/avatar"
            variant="ghost"
            size="sm"
            className="w-full justify-start"
            color="secondary"
          >
            Avatar
          </LinkButton>
          <LinkButton
            to="/docs/roadmap"
            variant="ghost"
            size="sm"
            className="w-full justify-start"
            color="secondary"
          >
            RoadMap
          </LinkButton>
          <LinkButton
            to="/docs/dialog"
            variant="ghost"
            size="sm"
            className="w-full justify-start"
            color="secondary"
          >
            Dialog
          </LinkButton>
          <LinkButton
            to="/docs/loader"
            variant="ghost"
            size="sm"
            className="w-full justify-start"
            color="secondary"
          >
            Loader
          </LinkButton>
          <LinkButton
            to="/docs/dropdownmenu"
            variant="ghost"
            size="sm"
            className="w-full justify-start"
            color="secondary"
          >
            DropdownMenu
          </LinkButton>
          <LinkButton
            to="/docs/filter"
            variant="ghost"
            size="sm"
            className="w-full justify-start"
            color="secondary"
          >
            Filter
          </LinkButton>
          <LinkButton
            to="/docs/snackbar"
            variant="ghost"
            size="sm"
            className="w-full justify-start"
            color="secondary"
          >
            Snackbar
          </LinkButton>
          <LinkButton
            to="/docs/theme"
            variant="ghost"
            size="sm"
            className="w-full justify-start"
            color="secondary"
          >
            ThemeSwitcher
          </LinkButton>
        </div>
      </Accordion>

      <Accordion title="Contexts" icon="fa-database">
        <div className="space-y-2">
          <LinkButton
            to="/docs/auth"
            variant="ghost"
            size="sm"
            className="w-full justify-start"
            color="secondary"
          >
            AuthContext
          </LinkButton>
          <LinkButton
            to="/docs/listcrud"
            variant="ghost"
            size="sm"
            className="w-full justify-start"
            color="secondary"
          >
            ListCrudContext
          </LinkButton>
        </div>
      </Accordion>

      <Accordion title="Otros" icon="fa-folder">
        <div className="space-y-2">
          <LinkButton
            to="/docs/example-form"
            variant="ghost"
            size="sm"
            className="w-full justify-start"
            color="secondary"
          >
            Formulario de Ejemplo
          </LinkButton>
          <LinkButton
            to="/docs/admin"
            variant="ghost"
            size="sm"
            className="w-full justify-start"
            color="secondary"
          >
            Admin (Mock Services)
          </LinkButton>
        </div>
      </Accordion>
    </div>
  );
};
