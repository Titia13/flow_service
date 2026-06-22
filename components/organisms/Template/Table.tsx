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
    // const { templates, fetchApps, totalApps,currentPage,  itemsPerPage, loading, setAppToEdit, confirmStatus, confirmDelete } = useTemplateStore();
    const { templates, fetchTemplates, totalTemplates, currentPage,  itemsPerPage, loading, setTemplateToEdit, confirmDelete } = useTemplateStore();
       const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: currentPage - 1,
    pageSize: itemsPerPage,
  });

   useEffect(() => {
    setPagination((prev) => ({ ...prev, pageIndex: currentPage - 1 }));
  }, [searchQuery]);
 
     useEffect(() => {
        fetchTemplates(currentPage, itemsPerPage, searchQuery);
    }, [fetchTemplates, currentPage, itemsPerPage, searchQuery]);
  const columns = useMemo(() => getColumns(setTemplateToEdit, confirmDelete), [confirmDelete]);

    const pageCount = Math.ceil(totalTemplates / pagination.pageSize);
    return (
        <div className="container mx-auto py-6">
        <DataTable columns={columns} data={templates} pageCount={pageCount} pagination={pagination} onPaginationChange={setPagination}/>
        </div>
    )
}
