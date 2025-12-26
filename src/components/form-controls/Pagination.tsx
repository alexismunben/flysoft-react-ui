import React from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "./Button";

export interface PaginationInterface<T> {
  list: Array<T>;
  limit: number;
  page: number;
  pages: number;
  total: number;
}

interface PaginationProps {
  fieldName?: string;
  page?: number;
  pages?: number;
  total?: number;
}

export const Pagination: React.FC<PaginationProps> = ({
  fieldName = "pagina",
  page = 1,
  pages = 1,
  total = 0,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const navigateToPage = (newPage: number) => {
    if (newPage < 1 || newPage > pages || newPage === page) {
      return;
    }

    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set(fieldName, newPage.toString());
    setSearchParams(newSearchParams, { replace: true });
  };

  const goToFirstPage = () => navigateToPage(1);
  const goToPreviousPage = () => navigateToPage(page - 1);
  const goToNextPage = () => navigateToPage(page + 1);
  const goToLastPage = () => navigateToPage(pages);

  const isFirstPage = page <= 1;
  const isLastPage = page >= pages;
  const hasPages = pages > 1;

  return (
    <div className="flex items-center gap-2">
      <div>
        <Button
          variant="ghost"
          size="sm"
          icon="fa-angle-double-left"
          onClick={goToFirstPage}
          disabled={isFirstPage || !hasPages}
          aria-label="Primera página"
        />
      </div>
      <div>
        <Button
          variant="ghost"
          size="sm"
          icon="fa-angle-left"
          onClick={goToPreviousPage}
          disabled={isFirstPage || !hasPages}
          aria-label="Página anterior"
        />
      </div>
      <div className="text-xs">
        <span className="block">
          Página {page} de {pages}
        </span>
        <span className="block">
          {total} elemento{total !== 1 ? "s" : ""}
        </span>
      </div>
      <div>
        <Button
          variant="ghost"
          size="sm"
          icon="fa-angle-right"
          onClick={goToNextPage}
          disabled={isLastPage || !hasPages}
          aria-label="Página siguiente"
        />
      </div>
      <div>
        <Button
          variant="ghost"
          size="sm"
          icon="fa-angle-double-right"
          onClick={goToLastPage}
          disabled={isLastPage || !hasPages}
          aria-label="Última página"
        />
      </div>
    </div>
    // <div className="flex flex-col items-center gap-0 font-[var(--font-default)]">
    //   {/* Botones de navegación */}
    //   <div className="flex items-center gap-2">
    //

    //     {/* Texto de página */}
    //     <span
    //       className="text-xs px-3 leading-none"
    //       style={{ color: "var(--color-text-primary)" }}
    //     >
    //       Página {page} de {pages}
    //     </span>

    //     <Button
    //       variant="ghost"
    //       size="sm"
    //       icon="fa-angle-right"
    //       onClick={goToNextPage}
    //       disabled={isLastPage || !hasPages}
    //       aria-label="Página siguiente"
    //     />
    //     <Button
    //       variant="ghost"
    //       size="sm"
    //       icon="fa-angle-double-right"
    //       onClick={goToLastPage}
    //       disabled={isLastPage || !hasPages}
    //       aria-label="Última página"
    //     />
    //   </div>

    //   {/* Texto de elementos */}
    //   <span
    //     className="text-xs leading-none"
    //     style={{ color: "var(--color-text-secondary)" }}
    //   >
    //     {total} elemento{total !== 1 ? "s" : ""}
    //   </span>
    // </div>
  );
};
