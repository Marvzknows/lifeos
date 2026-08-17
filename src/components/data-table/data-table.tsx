"use client";

import * as React from "react";
import { ChevronsUpDown, ArrowUp, ArrowDown } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "../ui/card";

export interface DataTableColumn<TData> {
  id: string;
  header: React.ReactNode;
  cell: (row: TData) => React.ReactNode;
  /**
   * Enables sorting on this column. Provide a value getter used for
   * comparison; omit `sortable` (or the getter) to leave it unsortable.
   */
  sortable?: boolean;
  sortAccessor?: (row: TData) => string | number | Date;
  className?: string;
  width?: string;
}

export interface DataTableProps<TData> {
  columns: DataTableColumn<TData>[];
  data: TData[];
  /** Returns a stable unique id for a row — required when using selection. */
  getRowId?: (row: TData) => string;
  enableRowSelection?: boolean;
  onRowSelectionChange?: (rows: TData[]) => void;
  onRowClick?: (row: TData) => void;
  emptyState?: React.ReactNode;
  className?: string;
  isLoading?: boolean;
  loadingRowCount?: number;
  header?: React.ReactNode;
}

type SortDirection = "asc" | "desc";

export function DataTable<TData>({
  columns,
  data,
  getRowId,
  enableRowSelection = false,
  onRowSelectionChange,
  onRowClick,
  emptyState,
  className,
  isLoading = false,
  loadingRowCount = 5,
  header,
}: DataTableProps<TData>) {
  const [sortId, setSortId] = React.useState<string | null>(null);
  const [sortDir, setSortDir] = React.useState<SortDirection>("asc");
  const [selected, setSelected] = React.useState<Set<string>>(new Set());

  const resolveId = React.useCallback(
    (row: TData, index: number) => getRowId?.(row) ?? String(index),
    [getRowId],
  );

  // --- Sort ---
  const sortColumn = columns.find((c) => c.id === sortId);
  const rows = React.useMemo(() => {
    if (!sortColumn?.sortAccessor) return data;
    const accessor = sortColumn.sortAccessor;
    const copy = [...data];
    copy.sort((a, b) => {
      const av = accessor(a);
      const bv = accessor(b);
      if (av < bv) return sortDir === "asc" ? -1 : 1;
      if (av > bv) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
    return copy;
  }, [data, sortColumn, sortDir]);

  function toggleSort(id: string) {
    if (sortId !== id) {
      setSortId(id);
      setSortDir("asc");
    } else if (sortDir === "asc") {
      setSortDir("desc");
    } else {
      setSortId(null);
    }
  }

  function emitSelection(next: Set<string>) {
    setSelected(next);
    if (onRowSelectionChange) {
      const selectedRows = rows.filter((row, i) => next.has(resolveId(row, i)));
      onRowSelectionChange(selectedRows);
    }
  }

  function toggleRow(id: string) {
    const next = new Set(selected);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    emitSelection(next);
  }

  function toggleAllOnPage() {
    const ids = rows.map((row, i) => resolveId(row, i));
    const allSelected = ids.every((id) => selected.has(id));
    const next = new Set(selected);
    if (allSelected) {
      ids.forEach((id) => next.delete(id));
    } else {
      ids.forEach((id) => next.add(id));
    }
    emitSelection(next);
  }

  const ids = rows.map((row, i) => resolveId(row, i));
  const allSelected = ids.length > 0 && ids.every((id) => selected.has(id));
  const someSelected = ids.some((id) => selected.has(id));

  return (
    <Card className={cn("space-y-4 rounded-sm", className)}>
      <CardContent className="rounded-md p-0 space-y-3">
        {header && <CardHeader className="border-b">{header}</CardHeader>}
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              {enableRowSelection && (
                <TableHead style={{ width: "40px" }}>
                  <Checkbox
                    checked={allSelected}
                    indeterminate={someSelected && !allSelected}
                    onCheckedChange={() => toggleAllOnPage()}
                    aria-label="Select all"
                    disabled={isLoading}
                  />
                </TableHead>
              )}
              {columns.map((col) => (
                <TableHead
                  key={col.id}
                  style={{ width: col.width }}
                  className={col.className}
                >
                  {col.sortable && col.sortAccessor ? (
                    <button
                      type="button"
                      onClick={() => toggleSort(col.id)}
                      disabled={isLoading}
                      className="-ml-2 flex items-center gap-1.5 rounded px-2 py-1 text-sm font-medium hover:bg-accent disabled:pointer-events-none"
                    >
                      {col.header}
                      {sortId === col.id ? (
                        sortDir === "asc" ? (
                          <ArrowUp className="h-3.5 w-3.5" />
                        ) : (
                          <ArrowDown className="h-3.5 w-3.5" />
                        )
                      ) : (
                        <ChevronsUpDown className="h-3.5 w-3.5 text-muted-foreground" />
                      )}
                    </button>
                  ) : (
                    col.header
                  )}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: loadingRowCount }).map((_, i) => (
                <TableRow
                  key={`skeleton-${i}`}
                  className="hover:bg-transparent"
                >
                  {enableRowSelection && (
                    <TableCell>
                      <Skeleton className="h-4 w-4 rounded-sm" />
                    </TableCell>
                  )}
                  {columns.map((col) => (
                    <TableCell key={col.id} className={col.className}>
                      <Skeleton className="h-4 w-full max-w-50" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : rows.length ? (
              rows.map((row, i) => {
                const id = resolveId(row, i);
                const isSelected = selected.has(id);
                return (
                  <TableRow
                    key={id}
                    data-state={isSelected ? "selected" : undefined}
                    onClick={() => onRowClick?.(row)}
                    className={cn(onRowClick && "cursor-pointer")}
                  >
                    {enableRowSelection && (
                      <TableCell onClick={(e) => e.stopPropagation()}>
                        <Checkbox
                          checked={isSelected}
                          onCheckedChange={() => toggleRow(id)}
                          aria-label="Select row"
                        />
                      </TableCell>
                    )}
                    {columns.map((col) => (
                      <TableCell key={col.id} className={col.className}>
                        {col.cell(row)}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })
            ) : (
              <TableRow className="hover:bg-transparent">
                <TableCell
                  colSpan={columns.length + (enableRowSelection ? 1 : 0)}
                  className="h-24 text-center text-muted-foreground"
                >
                  {emptyState ?? "No results."}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>

      {/* {!isLoading && (
        <div className="text-sm text-muted-foreground">
          {selected.size > 0
            ? `${selected.size} selected`
            : `${rows.length} row(s)`}
        </div>
      )} */}
    </Card>
  );
}
