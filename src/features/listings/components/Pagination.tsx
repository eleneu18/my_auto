import type { ReactNode } from "react";

import edgeArrowIcon from "../../../assets/images/arrow-edge-pagination.svg";
import arrowIcon from "../../../assets/images/arrow-pagination.svg";
import { cn } from "../../../shared/utils/cn";

type PaginationProps = {
  currentPage: number;
  lastPage: number;
  onPageChange: (page: number) => void;
};

const PAGE_WINDOW_SIZE = 4;

const buildPageWindow = (currentPage: number, lastPage: number): number[] => {
  if (lastPage <= 0) return [];

  const size = Math.min(PAGE_WINDOW_SIZE, lastPage);
  let start = Math.max(1, currentPage - 1);

  if (start + size - 1 > lastPage) {
    start = lastPage - size + 1;
  }

  return Array.from({ length: size }, (_, index) => start + index);
};

const Pagination = ({
  currentPage,
  lastPage,
  onPageChange,
}: PaginationProps) => {
  if (lastPage <= 1) return null;

  const pages = buildPageWindow(currentPage, lastPage);
  const isFirst = currentPage <= 1;
  const isLast = currentPage >= lastPage;

  return (
    <nav
      aria-label="Pagination"
      className="mt-5 rounded-[12px] bg-white px-4 py-4"
    >
      <div className="flex items-center justify-center gap-2">
        <NavIconButton
          ariaLabel="First page"
          disabled={isFirst}
          onClick={() => onPageChange(1)}
        >
          <img
            src={edgeArrowIcon}
            alt=""
            aria-hidden="true"
            className="h-6 w-6"
          />
        </NavIconButton>

        <NavIconButton
          ariaLabel="Previous page"
          disabled={isFirst}
          onClick={() => onPageChange(currentPage - 1)}
        >
          <img src={arrowIcon} alt="" aria-hidden="true" className="h-6 w-6" />
        </NavIconButton>

        {pages.map((page) => (
          <PageButton
            key={page}
            page={page}
            isCurrent={page === currentPage}
            onClick={() => onPageChange(page)}
          />
        ))}

        <NavIconButton
          ariaLabel="Next page"
          disabled={isLast}
          onClick={() => onPageChange(currentPage + 1)}
        >
          <img
            src={arrowIcon}
            alt=""
            aria-hidden="true"
            className="h-6 w-6 rotate-180"
          />
        </NavIconButton>

        <NavIconButton
          ariaLabel="Last page"
          disabled={isLast}
          onClick={() => onPageChange(lastPage)}
        >
          <img
            src={edgeArrowIcon}
            alt=""
            aria-hidden="true"
            className="h-6 w-6 rotate-180"
          />
        </NavIconButton>
      </div>
    </nav>
  );
};

type NavIconButtonProps = {
  ariaLabel: string;
  disabled: boolean;
  onClick: () => void;
  children: ReactNode;
};

const NavIconButton = ({
  ariaLabel,
  disabled,
  onClick,
  children,
}: NavIconButtonProps) => (
  <button
    type="button"
    aria-label={ariaLabel}
    disabled={disabled}
    onClick={onClick}
    className={cn(
      "flex h-9 w-9 items-center justify-center rounded-[8px] transition-colors",
      disabled ? "cursor-not-allowed opacity-30" : "hover:bg-[#EEF0F4]",
    )}
  >
    {children}
  </button>
);

type PageButtonProps = {
  page: number;
  isCurrent: boolean;
  onClick: () => void;
};

const PageButton = ({ page, isCurrent, onClick }: PageButtonProps) => (
  <button
    type="button"
    aria-current={isCurrent ? "page" : undefined}
    aria-label={`Page ${page}`}
    onClick={onClick}
    className={cn(
      "flex h-9 w-9 items-center justify-center rounded-[8px] text-[14px] font-medium transition-colors",
      isCurrent
        ? "bg-[#272A37] text-white"
        : "text-[#6F7383] hover:bg-[#EEF0F4] hover:text-[#272A37]",
    )}
  >
    {page}
  </button>
);

export default Pagination;
