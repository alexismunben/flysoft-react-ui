import React, { useState } from "react";
import { Card, DataTable, Button, Badge } from "../index";
import type { DataTableColumn } from "../components/layout/DataTable";

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  category: string;
  createdAt: string;
}

const DataTableDocs: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const allProducts: Product[] = [
    {
      id: 1,
      name: "Laptop Dell XPS 15",
      price: 1299.1,
      stock: 45,
      category: "Electrónica",
      createdAt: "2024-01-15",
    },
    {
      id: 2,
      name: "Mouse Logitech MX Master",
      price: 89.99,
      stock: 1200,
      category: "Accesorios",
      createdAt: "2024-02-20",
    },
    {
      id: 3,
      name: "Teclado Mecánico RGB",
      price: 149,
      stock: 0,
      category: "Accesorios",
      createdAt: "2024-03-10",
    },
    {
      id: 4,
      name: "Monitor 4K 27 pulgadas",
      price: 599,
      stock: 15,
      category: "Electrónica",
      createdAt: "2024-01-05",
    },
    {
      id: 5,
      name: "Auriculares Sony WH-1000XM5",
      price: 399.1,
      stock: 30,
      category: "Audio",
      createdAt: "2024-02-12",
    },
    {
      id: 6,
      name: "Webcam Logitech C920",
      price: 79.99,
      stock: 85,
      category: "Accesorios",
      createdAt: "2024-03-22",
    },
    {
      id: 7,
      name: "SSD Samsung 1TB",
      price: 129.99,
      stock: 200,
      category: "Almacenamiento",
      createdAt: "2024-01-28",
    },
    {
      id: 8,
      name: "Tablet iPad Pro 12.9",
      price: 1099.99,
      stock: 12,
      category: "Electrónica",
      createdAt: "2024-02-05",
    },
    {
      id: 9,
      name: "Cable USB-C Premium",
      price: 24.99,
      stock: 500,
      category: "Accesorios",
      createdAt: "2024-03-15",
    },
    {
      id: 10,
      name: "Router WiFi 6 ASUS",
      price: 199.99,
      stock: 25,
      category: "Redes",
      createdAt: "2024-01-20",
    },
    {
      id: 11,
      name: "Micrófono Blue Yeti",
      price: 129.99,
      stock: 40,
      category: "Audio",
      createdAt: "2024-02-18",
    },
    {
      id: 12,
      name: "Disco Duro Externo 2TB",
      price: 89.99,
      stock: 60,
      category: "Almacenamiento",
      createdAt: "2024-03-08",
    },
  ];

  // Solo 4 productos para los ejemplos normales
  const products = allProducts.slice(0, 4);

  const basicColumns: DataTableColumn<Product>[] = [
    {
      header: "ID",
      value: "id",
      align: "center",
      width: "80px",
      type: "numeric",
    },
    {
      header: "Nombre",
      value: "name",
      align: "left",
    },
    {
      header: "Categoría",
      value: "category",
      align: "left",
    },
  ];

  const fullColumns: DataTableColumn<Product>[] = [
    {
      header: "ID",
      value: "id",
      align: "center",
      width: "80px",
      type: "numeric",
      footer: `Total`,
    },
    {
      header: "Nombre del Producto",
      value: "name",
      align: "left",
    },
    {
      header: "Precio",
      value: "price",
      align: "right",
      type: "currency",
      footer: `${allProducts
        .reduce((sum, p) => sum + p.price, 0)
        .toLocaleString("es-AR", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`,
    },
    {
      header: "Stock",
      value: "stock",
      align: "center",
      type: "numeric",
      footer: `${allProducts
        .reduce((sum, p) => sum + p.stock, 0)
        .toLocaleString("es-AR")}`,
    },
    {
      header: "Categoría",
      value: "category",
      align: "left",
    },
    {
      header: "Fecha de Creación",
      value: "createdAt",
      align: "center",
      type: "date",
    },
  ];

  const customColumns: DataTableColumn<Product>[] = [
    {
      header: "ID",
      value: "id",
      align: "center",
      width: "80px",
      type: "numeric",
    },
    {
      header: "Nombre",
      value: "name",
      align: "left",
    },
    {
      header: "Precio",
      value: "price",
      align: "right",
      type: "currency",
      tooltip: (row) => `Precio original: ${row.price}€`,
    },
    {
      header: "Stock",
      value: (row) => (
        <Badge
          variant={row.stock > 0 ? "success" : "danger"}
          icon={row.stock > 0 ? "fa-check-circle" : "fa-times-circle"}
        >
          {row.stock > 0 ? `${row.stock} unidades` : "Sin stock"}
        </Badge>
      ),
      align: "center",
    },
    {
      header: "Acciones",
      value: "",
      align: "center",
      actions: (row) => [
        <Button
          key="edit"
          size="sm"
          variant="ghost"
          icon="fa-edit"
          onClick={() => console.log("Editar", row)}
        >
          Editar
        </Button>,
        <Button
          key="delete"
          size="sm"
          variant="ghost"
          icon="fa-trash"
          onClick={() => console.log("Eliminar", row)}
        >
          Eliminar
        </Button>,
      ],
    },
    {
      header: "Ver",
      value: "",
      align: "center",
      actions: (row) => [
        <Button
          key="view"
          size="sm"
          variant="ghost"
          icon="fa-search"
          onClick={() => console.log("Ver detalles", row)}
        />,
      ],
    },
  ];

  const headerCustomColumns: DataTableColumn<Product>[] = [
    {
      header: (
        <div className="flex items-center gap-2">
          <i className="fal fa-hashtag" />
          <span>ID</span>
        </div>
      ),
      value: "id",
      align: "center",
      width: "80px",
      type: "numeric",
    },
    {
      header: (
        <div className="flex items-center gap-2">
          <i className="fal fa-box" />
          <span>Producto</span>
        </div>
      ),
      value: "name",
      align: "left",
    },
    {
      header: (
        <div className="flex items-center gap-2">
          <i className="fal fa-euro-sign" />
          <span>Precio</span>
        </div>
      ),
      value: "price",
      align: "right",
      type: "currency",
      headerActions: () => [
        <Button
          key="export"
          size="sm"
          variant="ghost"
          icon="fa-download"
          onClick={() => console.log("Exportar precios")}
        >
          Exportar
        </Button>,
        <Button
          key="filter"
          size="sm"
          variant="ghost"
          icon="fa-filter"
          onClick={() => console.log("Filtrar precios")}
        >
          Filtrar
        </Button>,
      ],
    },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <Card title="DataTable - Variantes y Ejemplos">
        <div className="space-y-10">
          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Tabla básica
            </h3>
            <p
              className="mb-4 text-sm"
              style={{ color: "var(--flysoft-text-secondary)" }}
            >
              Ejemplo básico de una tabla con columnas simples usando nombres de
              propiedades.
            </p>
            <Card>
              <DataTable columns={basicColumns} rows={products} />
            </Card>
          </section>

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Tabla completa con tipos de datos
            </h3>
            <p
              className="mb-4 text-sm"
              style={{ color: "var(--flysoft-text-secondary)" }}
            >
              Tabla con diferentes tipos de datos: currency, numeric y date. Las
              columnas se formatean automáticamente según su tipo.
            </p>
            <Card>
              <DataTable columns={fullColumns} rows={products} />
            </Card>
          </section>

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Tabla con contenido personalizado y acciones
            </h3>
            <p
              className="mb-4 text-sm"
              style={{ color: "var(--flysoft-text-secondary)" }}
            >
              Ejemplo con valores personalizados usando funciones, tooltips y
              componentes React como Badges. La columna de acciones usa la
              propiedad <code>actions</code> que muestra un DropdownMenu con las
              acciones disponibles para cada fila. Cuando hay una sola acción
              (como en la columna "Ver"), se muestra directamente gracias a{" "}
              <code>replaceOnSingleOption</code>, sin necesidad de abrir un
              menú.
            </p>
            <Card>
              <DataTable columns={customColumns} rows={products} />
            </Card>
          </section>

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Tabla con headers personalizados y acciones en header
            </h3>
            <p
              className="mb-4 text-sm"
              style={{ color: "var(--flysoft-text-secondary)" }}
            >
              Los headers pueden ser ReactNode, permitiendo incluir iconos u
              otros componentes personalizados. También puedes usar{" "}
              <code>headerActions</code> para agregar un DropdownMenu con
              acciones en el header de la columna.
            </p>
            <Card>
              <DataTable columns={headerCustomColumns} rows={products} />
            </Card>
          </section>

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Tabla con scroll limitado (maxRows) y footer
            </h3>
            <p
              className="mb-4 text-sm"
              style={{ color: "var(--flysoft-text-secondary)" }}
            >
              Usando la prop <code>maxRows</code> puedes limitar el número de
              filas visibles. Si hay más filas que el máximo, la tabla mostrará
              scroll solo en las filas mientras el header y el footer permanecen
              fijos. El footer se muestra usando la propiedad{" "}
              <code>footer</code> en las columnas.
            </p>
            <Card>
              <DataTable columns={fullColumns} rows={allProducts} maxRows={5} />
            </Card>
          </section>

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Tabla con locale personalizado
            </h3>
            <p
              className="mb-4 text-sm"
              style={{ color: "var(--flysoft-text-secondary)" }}
            >
              Usando la prop <code>locale</code> puedes cambiar el formato de
              los números (separador de miles y decimales). Por defecto usa{" "}
              <code>'es-AR'</code>. En este ejemplo se usa <code>'en-US'</code>{" "}
              que formatea los números con coma como separador de miles y punto
              como separador decimal.
            </p>
            <Card>
              <DataTable columns={fullColumns} rows={products} locale="en-US" />
            </Card>
          </section>

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Tabla con estado de carga (Loading)
            </h3>
            <p
              className="mb-4 text-sm"
              style={{ color: "var(--flysoft-text-secondary)" }}
            >
              Usando las props <code>isLoading</code> y <code>loadingRows</code>{" "}
              puedes mostrar un estado de carga con skeleton loaders. Cuando{" "}
              <code>isLoading</code> es <code>true</code>, la tabla muestra las
              columnas pero reemplaza las filas de datos con filas skeleton que
              simulan el contenido. El número de filas skeleton se controla con{" "}
              <code>loadingRows</code> (por defecto 5).
            </p>
            <div className="mb-4">
              <Button
                variant="primary"
                icon="fa-sync-alt"
                onClick={() => {
                  setIsLoading(true);
                  setTimeout(() => setIsLoading(false), 3000);
                }}
                disabled={isLoading}
              >
                {isLoading ? "Cargando..." : "Simular carga"}
              </Button>
            </div>
            <Card>
              <DataTable
                columns={fullColumns}
                rows={products}
                isLoading={isLoading}
                loadingRows={5}
              />
            </Card>
          </section>

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Tabla con estilos condicionales (rowClassName)
            </h3>
            <p
              className="mb-4 text-sm"
              style={{ color: "var(--flysoft-text-secondary)" }}
            >
              Usando la prop <code>rowClassName</code> puedes aplicar clases CSS
              a filas específicas basándote en sus datos. En este ejemplo, los
              productos sin stock se resaltan con un fondo rojo suave.
            </p>
            <Card>
              <DataTable
                columns={basicColumns}
                rows={products}
                rowClassName={(row) =>
                  row.stock === 0 ? "bg-red-50 dark:bg-red-900/20" : ""
                }
              />
            </Card>
          </section>

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Tabla con estilos de Header y Footer
            </h3>
            <p
              className="mb-4 text-sm"
              style={{ color: "var(--flysoft-text-secondary)" }}
            >
              Usando las props <code>headerClassName</code> y{" "}
              <code>footerClassName</code> puedes aplicar clases CSS
              directamente a las filas del header y footer. En este ejemplo, se
              aplica un fondo azul suave al header y un borde superior más
              grueso al footer.
            </p>
            <Card>
              <DataTable
                columns={fullColumns}
                rows={products}
                headerClassName="bg-red-50/50 border-b-2 border-primary"
                footerClassName="border-t-2 border-primary bg-green-500"
              />
            </Card>
          </section>

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Tabla con estilos de Celdas (Cell ClassNames)
            </h3>
            <p
              className="mb-4 text-sm"
              style={{ color: "var(--flysoft-text-secondary)" }}
            >
              Además de las filas, puedes aplicar clases específicamente a las
              celdas del header, footer y body. El <code>cellClassName</code>{" "}
              del body puede ser un string o una función que recibe la fila y la
              columna para un control total.
            </p>
            <Card>
              <DataTable
                columns={basicColumns}
                rows={products}
                headerCellClassName="text-primary italic uppercase tracking-wider"
                cellClassName={(_row, column) =>
                  column.value === "name" ? "font-bold text-blue-600" : ""
                }
              />
            </Card>
          </section>

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Tabla Compacta
            </h3>
            <p
              className="mb-4 text-sm"
              style={{ color: "var(--flysoft-text-secondary)" }}
            >
              Usando la prop <code>compact</code> puedes reducir
              significativamente el espacio que ocupa la tabla. Este modo
              elimina los paddings superiores y reduce los horizontales, ideal
              para mostrar grandes cantidades de datos en espacios reducidos.
            </p>
            <Card>
              <DataTable
                columns={basicColumns}
                rows={products}
                compact={true}
              />
            </Card>
          </section>

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Características
            </h3>
            <div className="space-y-3">
              <div className="p-3 bg-[var(--color-bg-default)] border border-[var(--color-border-default)] rounded">
                <ul
                  className="list-disc list-inside space-y-2 text-sm"
                  style={{ color: "var(--flysoft-text-secondary)" }}
                >
                  <li>
                    <strong>Tipos de datos:</strong> Soporta text, numeric,
                    currency y date con formateo automático
                  </li>
                  <li>
                    <strong>Acciones por fila:</strong> Usa la propiedad{" "}
                    <code>actions</code> para mostrar un DropdownMenu con
                    acciones específicas para cada fila
                  </li>
                  <li>
                    <strong>Acciones en header:</strong> Usa la propiedad{" "}
                    <code>headerActions</code> para mostrar un DropdownMenu con
                    acciones en el header de la columna
                  </li>
                  <li>
                    <strong>Alineación:</strong> Cada columna puede tener su
                    propia alineación (left, right, center)
                  </li>
                  <li>
                    <strong>Ancho personalizado:</strong> Puedes definir el
                    ancho de cada columna usando la propiedad width
                  </li>
                  <li>
                    <strong>Valores personalizados:</strong> El value puede ser
                    una función que recibe la fila completa y retorna ReactNode
                  </li>
                  <li>
                    <strong>Tooltips:</strong> Soporte para tooltips
                    personalizados por celda
                  </li>
                  <li>
                    <strong>Headers personalizados:</strong> Los headers pueden
                    ser ReactNode para incluir iconos o componentes
                  </li>
                  <li>
                    <strong>Hover effect:</strong> Las filas tienen un efecto
                    hover para mejor UX
                  </li>
                  <li>
                    <strong>Responsive:</strong> La tabla tiene scroll
                    horizontal automático en pantallas pequeñas
                  </li>
                  <li>
                    <strong>Scroll limitado:</strong> Con maxRows puedes limitar
                    el número de filas visibles, manteniendo el header fijo y
                    permitiendo scroll solo en las filas
                  </li>
                  <li>
                    <strong>Estilos condicionales:</strong> Usa{" "}
                    <code>rowClassName</code> para aplicar clases CSS a filas
                    específicas según sus datos
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Props
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-[var(--color-border-default)]">
                    <th
                      className="text-left p-3 font-semibold"
                      style={{ color: "var(--flysoft-text-primary)" }}
                    >
                      Prop
                    </th>
                    <th
                      className="text-left p-3 font-semibold"
                      style={{ color: "var(--flysoft-text-primary)" }}
                    >
                      Tipo
                    </th>
                    <th
                      className="text-left p-3 font-semibold"
                      style={{ color: "var(--flysoft-text-primary)" }}
                    >
                      Descripción
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-[var(--color-border-default)]">
                    <td className="p-3">
                      <code className="text-sm text-[var(--color-primary)]">
                        columns
                      </code>
                    </td>
                    <td className="p-3 text-sm">DataTableColumn&lt;T&gt;[]</td>
                    <td className="p-3 text-sm">
                      Array de columnas que define la estructura de la tabla
                    </td>
                  </tr>
                  <tr className="border-b border-[var(--color-border-default)]">
                    <td className="p-3">
                      <code className="text-sm text-[var(--color-primary)]">
                        rows
                      </code>
                    </td>
                    <td className="p-3 text-sm">T[]</td>
                    <td className="p-3 text-sm">
                      Array de objetos que representan las filas de la tabla
                    </td>
                  </tr>
                  <tr className="border-b border-[var(--color-border-default)]">
                    <td className="p-3">
                      <code className="text-sm text-[var(--color-primary)]">
                        className
                      </code>
                    </td>
                    <td className="p-3 text-sm">string</td>
                    <td className="p-3 text-sm">
                      Clases CSS adicionales para el contenedor de la tabla
                    </td>
                  </tr>
                  <tr className="border-b border-[var(--color-border-default)]">
                    <td className="p-3">
                      <code className="text-sm text-[var(--color-primary)]">
                        maxRows
                      </code>
                    </td>
                    <td className="p-3 text-sm">number</td>
                    <td className="p-3 text-sm">
                      Máximo número de filas visibles. Si hay más filas, se
                      activa scroll vertical manteniendo el header fijo
                    </td>
                  </tr>
                  <tr className="border-b border-[var(--color-border-default)]">
                    <td className="p-3">
                      <code className="text-sm text-[var(--color-primary)]">
                        locale
                      </code>
                    </td>
                    <td className="p-3 text-sm">string</td>
                    <td className="p-3 text-sm">
                      Locale para formateo de números (currency y numeric). Por
                      defecto es <code>'es-AR'</code>. Ejemplos:{" "}
                      <code>'en-US'</code>, <code>'es-ES'</code>,{" "}
                      <code>'de-DE'</code>
                    </td>
                  </tr>
                  <tr className="border-b border-[var(--color-border-default)]">
                    <td className="p-3">
                      <code className="text-sm text-[var(--color-primary)]">
                        isLoading
                      </code>
                    </td>
                    <td className="p-3 text-sm">boolean</td>
                    <td className="p-3 text-sm">
                      Estado de carga. Cuando es <code>true</code>, muestra
                      filas skeleton en lugar de los datos. Por defecto es{" "}
                      <code>false</code>
                    </td>
                  </tr>
                  <tr className="border-b border-[var(--color-border-default)]">
                    <td className="p-3">
                      <code className="text-sm text-[var(--color-primary)]">
                        loadingRows
                      </code>
                    </td>
                    <td className="p-3 text-sm">number</td>
                    <td className="p-3 text-sm">
                      Número de filas skeleton a mostrar cuando{" "}
                      <code>isLoading</code> es <code>true</code>. Por defecto
                      es <code>isLoading</code> es <code>true</code>. Por
                      defecto es <code>5</code>
                    </td>
                  </tr>
                  <tr className="border-b border-[var(--color-border-default)]">
                    <td className="p-3">
                      <code className="text-sm text-[var(--color-primary)]">
                        rowClassName
                      </code>
                    </td>
                    <td className="p-3 text-sm">(row: T) =&gt; string</td>
                    <td className="p-3 text-sm">
                      Función opcional para aplicar clases CSS a una fila
                      específica basada en sus datos
                    </td>
                  </tr>
                  <tr className="border-b border-[var(--color-border-default)]">
                    <td className="p-3">
                      <code className="text-sm text-[var(--color-primary)]">
                        headerClassName
                      </code>
                    </td>
                    <td className="p-3 text-sm">string</td>
                    <td className="p-3 text-sm">
                      Clases CSS adicionales para la fila del header (tr)
                    </td>
                  </tr>
                  <tr className="border-b border-[var(--color-border-default)]">
                    <td className="p-3">
                      <code className="text-sm text-[var(--color-primary)]">
                        footerClassName
                      </code>
                    </td>
                    <td className="p-3 text-sm">string</td>
                    <td className="p-3 text-sm">
                      Clases CSS adicionales para la fila del footer (tr)
                    </td>
                  </tr>
                  <tr className="border-b border-[var(--color-border-default)]">
                    <td className="p-3">
                      <code className="text-sm text-[var(--color-primary)]">
                        headerCellClassName
                      </code>
                    </td>
                    <td className="p-3 text-sm">string</td>
                    <td className="p-3 text-sm">
                      Clases CSS adicionales para todas las celdas del header
                      (th)
                    </td>
                  </tr>
                  <tr className="border-b border-[var(--color-border-default)]">
                    <td className="p-3">
                      <code className="text-sm text-[var(--color-primary)]">
                        footerCellClassName
                      </code>
                    </td>
                    <td className="p-3 text-sm">string</td>
                    <td className="p-3 text-sm">
                      Clases CSS adicionales para todas las celdas del footer
                      (td)
                    </td>
                  </tr>
                  <tr className="border-b border-[var(--color-border-default)]">
                    <td className="p-3">
                      <code className="text-sm text-[var(--color-primary)]">
                        cellClassName
                      </code>
                    </td>
                    <td className="p-3 text-sm">
                      string | ((row: T, col: Col) =&gt; string)
                    </td>
                    <td className="p-3 text-sm">
                      Clases CSS para celdas del body. Puede ser una función
                      para lógica condicional por celda
                    </td>
                  </tr>
                  <tr className="border-b border-[var(--color-border-default)]">
                    <td className="p-3">
                      <code className="text-sm text-[var(--color-primary)]">
                        compact
                      </code>
                    </td>
                    <td className="p-3 text-sm">boolean</td>
                    <td className="p-3 text-sm">
                      Si es true, reduce el padding de todas las celdas para una
                      visualización más densa. Por defecto es false.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              DataTableColumn Props
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-[var(--color-border-default)]">
                    <th
                      className="text-left p-3 font-semibold"
                      style={{ color: "var(--flysoft-text-primary)" }}
                    >
                      Prop
                    </th>
                    <th
                      className="text-left p-3 font-semibold"
                      style={{ color: "var(--flysoft-text-primary)" }}
                    >
                      Tipo
                    </th>
                    <th
                      className="text-left p-3 font-semibold"
                      style={{ color: "var(--flysoft-text-primary)" }}
                    >
                      Descripción
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-[var(--color-border-default)]">
                    <td className="p-3">
                      <code className="text-sm text-[var(--color-primary)]">
                        align
                      </code>
                    </td>
                    <td className="p-3 text-sm">"left" | "right" | "center"</td>
                    <td className="p-3 text-sm">
                      Alineación del contenido de la columna
                    </td>
                  </tr>
                  <tr className="border-b border-[var(--color-border-default)]">
                    <td className="p-3">
                      <code className="text-sm text-[var(--color-primary)]">
                        width
                      </code>
                    </td>
                    <td className="p-3 text-sm">string</td>
                    <td className="p-3 text-sm">
                      Ancho de la columna (ej: "100px", "20%")
                    </td>
                  </tr>
                  <tr className="border-b border-[var(--color-border-default)]">
                    <td className="p-3">
                      <code className="text-sm text-[var(--color-primary)]">
                        header
                      </code>
                    </td>
                    <td className="p-3 text-sm">string | ReactNode</td>
                    <td className="p-3 text-sm">
                      Texto o componente React para el header de la columna
                    </td>
                  </tr>
                  <tr className="border-b border-[var(--color-border-default)]">
                    <td className="p-3">
                      <code className="text-sm text-[var(--color-primary)]">
                        value
                      </code>
                    </td>
                    <td className="p-3 text-sm">
                      string | number | ((row: T) =&gt; string | ReactNode)
                    </td>
                    <td className="p-3 text-sm">
                      Nombre de la propiedad del objeto, valor directo, o
                      función que retorna el valor a mostrar
                    </td>
                  </tr>
                  <tr className="border-b border-[var(--color-border-default)]">
                    <td className="p-3">
                      <code className="text-sm text-[var(--color-primary)]">
                        tooltip
                      </code>
                    </td>
                    <td className="p-3 text-sm">
                      (row: T) =&gt; string | ReactNode
                    </td>
                    <td className="p-3 text-sm">
                      Función que retorna el tooltip a mostrar al hacer hover
                      sobre la celda
                    </td>
                  </tr>
                  <tr className="border-b border-[var(--color-border-default)]">
                    <td className="p-3">
                      <code className="text-sm text-[var(--color-primary)]">
                        type
                      </code>
                    </td>
                    <td className="p-3 text-sm">
                      "text" | "numeric" | "currency" | "date"
                    </td>
                    <td className="p-3 text-sm">
                      Tipo de dato que determina el formateo automático
                    </td>
                  </tr>
                  <tr className="border-b border-[var(--color-border-default)]">
                    <td className="p-3">
                      <code className="text-sm text-[var(--color-primary)]">
                        actions
                      </code>
                    </td>
                    <td className="p-3 text-sm">
                      (row: T) =&gt; Array&lt;ReactNode&gt;
                    </td>
                    <td className="p-3 text-sm">
                      Función que retorna un array de ReactNode que se mostrarán
                      en un DropdownMenu para cada fila. Las acciones deben
                      manejar sus propios eventos onClick.
                    </td>
                  </tr>
                  <tr className="border-b border-[var(--color-border-default)]">
                    <td className="p-3">
                      <code className="text-sm text-[var(--color-primary)]">
                        headerActions
                      </code>
                    </td>
                    <td className="p-3 text-sm">
                      () =&gt; Array&lt;ReactNode&gt;
                    </td>
                    <td className="p-3 text-sm">
                      Función que retorna un array de ReactNode que se mostrarán
                      en un DropdownMenu en el header de la columna. Las
                      acciones deben manejar sus propios eventos onClick.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </Card>
    </div>
  );
};

export default DataTableDocs;
