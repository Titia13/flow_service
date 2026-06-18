"use client"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    initialState: {
    columnPinning: {
      left: ["name"], 
      right: ["actions"], 
    }
    },
  })

  return (
    <div className="overflow-hidden rounded-md border overflow-x-auto">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const isPinned = header.column.getIsPinned();
                return (
                  <TableHead 
                    key={header.id}
                    className={isPinned ? "sticky bg-[#fffaf7] left-0 z-10 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]" : ""}
                    style={{
                      // left: isPinned ? `${header.column.getStart("left")}px` : undefined,
                      left: isPinned === "left" ? `${header.column.getStart("left")}px` : undefined,
                      right: isPinned === "right" ? `${header.column.getAfter("right")}px` : undefined,
                      // backgroundColor: isPinned ? "#fffaf7" : undefined,
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
          {table.getRowModel().rows?.length ? (
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
                      //  Rendu sticky pour le contenu des cellules
                      className={isPinned ? "sticky left-0 bg-[#fffaf7] z-10 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]" : ""}
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
  )
}