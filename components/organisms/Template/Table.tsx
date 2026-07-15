'use client'
import { useEffect, useMemo, useState } from "react";
import { PaginationState } from "@tanstack/react-table";
import { useTemplateStore } from "@/app/store/templateStore";
import { getColumns } from "./Columns";
import { DataTable } from "./data-table";

interface Props {
  searchQuery: string;
}

export default function Table({ searchQuery }: Props) {
  const { uploadFile, templates, fetchTemplates, pageCount, currentPage, itemsPerPage, loading, setTemplateToEdit, confirmDelete, confirmStatus } = useTemplateStore();
  // const columns = useMemo(() => getColumns(setTemplateToEdit, confirmDelete, confirmStatus, uploadFile), [confirmDelete, confirmStatus, uploadFile]);
const columns = useMemo(() => 
  getColumns(
    setTemplateToEdit, 
    confirmDelete, 
    confirmStatus, 
    (data, id) => uploadFile(data, id) // Appel correct avec les deux arguments
  ), 
  [confirmDelete, confirmStatus, uploadFile]
);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: currentPage - 1,
    pageSize: itemsPerPage,
  });

  useEffect(() => {
    setPagination((prev) => ({ ...prev, pageIndex: currentPage - 1 }));
  }, [searchQuery]);

  useEffect(() => {
    fetchTemplates(pagination.pageIndex + 1, pagination.pageSize, searchQuery);
  }, [fetchTemplates, pagination.pageIndex, pagination.pageSize, searchQuery]);

  // const pageCount = Math.ceil(totalTemplates / pagination.pageSize);
  return (
    <div className="container mx-auto py-6">
      <DataTable columns={columns} data={templates} pageCount={pageCount} pagination={pagination} onPaginationChange={setPagination} isLoading={loading} />
    </div>
  )
}
