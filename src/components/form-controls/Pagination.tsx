import React from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "./Button";

export interface PaginationProps {
  fieldName?: string;
  page?: number;
  pages?: number;
  total?: number;
  isLoading?: boolean;
}

export const Pagination: React.FC<PaginationProps> = ({
  fieldName = "pagina",
  page = 1,
  pages = 1,
  total = 0,
  isLoading = false,
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
          disabled={isFirstPage || !hasPages || isLoading}
          aria-label="Primera página"
        />
      </div>
      <div>
        <Button
          variant="ghost"
          size="sm"
          icon="fa-angle-left"
          onClick={goToPreviousPage}
          disabled={isFirstPage || !hasPages || isLoading}
          aria-label="Página anterior"
        />
      </div>
      <div
        className={`text-xs h-[32px] min-w-[100px] text-center flex flex-col justify-center`}
      >
        {isLoading ? (
          <>
            <span className="block">Cargando...</span>
          </>
        ) : (
          <>
            <span className="block">
              Página {page} de {pages}
            </span>
            <span className="block">
              {total} elemento{total !== 1 ? "s" : ""}
            </span>
          </>
        )}
      </div>
      <div>
        <Button
          variant="ghost"
          size="sm"
          icon="fa-angle-right"
          onClick={goToNextPage}
          disabled={isLastPage || !hasPages || isLoading}
          aria-label="Página siguiente"
        />
      </div>
      <div>
        <Button
          variant="ghost"
          size="sm"
          icon="fa-angle-double-right"
          onClick={goToLastPage}
          disabled={isLastPage || !hasPages || isLoading}
          aria-label="Última página"
        />
      </div>
    </div>
  );
};
