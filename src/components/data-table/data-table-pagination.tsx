"use client";

import * as React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface DataTablePaginationProps {
  page: number; // 1-indexed
  pageCount: number;
  onPageChange: (page: number) => void;
}

/**
 * Builds a page-number list with ellipses, e.g. for page 5 of 10:
 * [1, "ellipsis", 4, 5, 6, "ellipsis", 10]
 */
function getPageList(page: number, pageCount: number): (number | "ellipsis")[] {
  const pages: (number | "ellipsis")[] = [];
  const siblings = 1;

  const start = Math.max(2, page - siblings);
  const end = Math.min(pageCount - 1, page + siblings);

  pages.push(1);
  if (start > 2) pages.push("ellipsis");
  for (let i = start; i <= end; i++) pages.push(i);
  if (end < pageCount - 1) pages.push("ellipsis");
  if (pageCount > 1) pages.push(pageCount);

  return pages;
}

export function DataTablePagination({
  page,
  pageCount,
  onPageChange,
}: DataTablePaginationProps) {
  if (pageCount <= 1) return null;

  const pageList = getPageList(page, pageCount);

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            // href="#"
            onClick={(e) => {
              e.preventDefault();
              if (page > 1) onPageChange(page - 1);
            }}
            aria-disabled={page === 1}
            className={
              page === 1 ? "pointer-events-none opacity-50" : undefined
            }
          />
        </PaginationItem>

        {pageList.map((p, i) =>
          p === "ellipsis" ? (
            <PaginationItem key={`ellipsis-${i}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={p}>
              <PaginationLink
                // href="#"
                isActive={p === page}
                onClick={(e) => {
                  e.preventDefault();
                  onPageChange(p);
                }}
              >
                {p}
              </PaginationLink>
            </PaginationItem>
          ),
        )}

        <PaginationItem>
          <PaginationNext
            // href="#"
            onClick={(e) => {
              e.preventDefault();
              if (page < pageCount) onPageChange(page + 1);
            }}
            aria-disabled={page === pageCount}
            className={
              page === pageCount ? "pointer-events-none opacity-50" : undefined
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
