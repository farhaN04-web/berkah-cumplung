import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
import { Pagination as PaginationType } from "@/types/pagination";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

interface PaginationWrapperProps {
  paging?: PaginationType;
  className?: string;
}

export default function PaginationWrapper({
  paging,
  className,
}: PaginationWrapperProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640); // sm breakpoint
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!paging) return null;

  const { current_page, total_page } = paging;

  if (total_page <= 1) return null;

  const createPageURL = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(pageNumber));
    return `?${params.toString()}`;
  };

  const handlePageChange = (page: number) => {
    if (page !== current_page && page > 0 && page <= total_page) {
      const newParams = new URLSearchParams(searchParams);
      newParams.set("page", page.toString());

      setSearchParams(newParams);

      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const generatePagination = (
    currentPage: number,
    totalPages: number,
    isMobile: boolean,
  ) => {
    const windowSize = isMobile ? 1 : 2; // 👈 mobile lebih ringkas

    if (totalPages <= (isMobile ? 5 : 7)) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const firstPage = 1;
    const lastPage = totalPages;

    let pages: (number | "ellipsis")[] = [];

    pages = [firstPage];

    let rangeStart = Math.max(2, currentPage - windowSize);
    let rangeEnd = Math.min(totalPages - 1, currentPage + windowSize);

    if (currentPage <= (isMobile ? 3 : 4)) {
      rangeEnd = isMobile ? 3 : 5;
    } else if (currentPage >= totalPages - (isMobile ? 2 : 3)) {
      rangeStart = totalPages - (isMobile ? 2 : 4);
    }

    if (rangeStart > 2) {
      pages.push("ellipsis");
    } else {
      rangeStart = 2;
    }

    for (let i = rangeStart; i <= rangeEnd; i++) {
      pages.push(i);
    }

    if (rangeEnd < totalPages - 1) {
      pages.push("ellipsis");
    }

    if (pages[pages.length - 1] !== lastPage) {
      pages.push(lastPage);
    }

    return pages;
  };

  const pageNumbers = generatePagination(current_page, total_page, isMobile);

  return (
    <Pagination className={cn(className)}>
      <PaginationContent>
        <PaginationItem>
          {current_page === 1 ? (
            <PaginationPrevious
              className="opacity-50 pointer-events-none"
              href="#"
              aria-disabled="true"
            />
          ) : (
            <PaginationPrevious
              href={createPageURL(current_page - 1)}
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(current_page - 1);
              }}
              className="cursor-pointer"
            />
          )}
        </PaginationItem>

        {pageNumbers.map((pageNumber, index) => (
          <PaginationItem key={`${pageNumber}-${index}`}>
            {pageNumber === "ellipsis" ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                href={createPageURL(pageNumber as number)}
                isActive={pageNumber === current_page}
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(pageNumber as number);
                }}
                className={cn(
                  "cursor-pointer",
                  pageNumber === current_page && "font-bold",
                )}
              >
                {pageNumber}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        <PaginationItem>
          {current_page === total_page ? (
            <PaginationNext
              className="opacity-50 pointer-events-none"
              href="#"
              aria-disabled="true"
            />
          ) : (
            <PaginationNext
              href={createPageURL(current_page + 1)}
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(current_page + 1);
              }}
              className="cursor-pointer"
            />
          )}
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
