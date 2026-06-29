"use client"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  // getPaginationRowModel, // gerer la pagination
  OnChangeFn,
  PaginationState,
  useReactTable,
} from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { SkeletonTable } from "../Application/Skeleton"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  pageCount: number;
  pagination: PaginationState;
  onPaginationChange: OnChangeFn<PaginationState>;
  isLoading?: boolean;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  pageCount,
  pagination,
  onPaginationChange,
  isLoading,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    pageCount,
    state: { pagination },
    manualPagination: true,// <-- désactive la pagination locale
    onPaginationChange,
    getCoreRowModel: getCoreRowModel(),
    initialState: {
      columnPinning: {
        left: ["filename"],
        right: ["actions"],
      }
    },
  })

  return (
    <div>
      <div className="overflow-hidden rounded-md border overflow-x-auto">
        <Table
          className="shadow-md">
          <TableHeader
            className="bg-[#923e0e] text-white [&_tr]:hover:bg-transparent [&_th]:text-white"
          >
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const isPinned = header.column.getIsPinned();
                  return (
                    <TableHead
                      key={header.id}
                      className={isPinned ? "sticky  left-0 z-10 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]" : ""}
                      style={{
                        left: isPinned === "left" ? `${header.column.getStart("left")}px` : undefined,
                        right: isPinned === "right" ? `${header.column.getAfter("right")}px` : undefined,
                      }}
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
                <TableRow>
                    <TableCell colSpan={columns.length}>
                      <SkeletonTable columnCount={columns.length} rowCount={5}/>
                    </TableCell>
                </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => {
                    const isPinned = cell.column.getIsPinned();
                    return (
                      <TableCell
                        key={cell.id}
                        className={isPinned ? "sticky left-0 z-10 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]" : ""}
                        style={{
                          left: isPinned ? `${cell.column.getStart("left")}px` : undefined,
                          right: isPinned === "right" ? `${cell.column.getAfter("right")}px` : undefined,
                        }}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  Pas de donnees
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* // gerer la pagination */}
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          Page {table.getState().pagination.pageIndex + 1} sur {table.getPageCount()}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <ArrowRight className="mr-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}