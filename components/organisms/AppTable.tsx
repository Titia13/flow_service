'use client'
import { useAppStore } from "@/app/store/appStore";
import { getColumns } from "./Appcolumns"
import { DataTable } from "./data-table"
import { useEffect, useMemo, useState } from "react";
import { PaginationState } from "@tanstack/react-table";

interface Props {
  searchQuery: string;
}

export default function AppTable({ searchQuery }: Props) {
    const { apps, fetchApps, totalApps,currentPage,  itemsPerPage, loading, setAppToEdit, confirmStatus, confirmDelete } = useAppStore();
    const columns = useMemo(() => getColumns(setAppToEdit, confirmStatus, confirmDelete), [confirmStatus, confirmDelete]);
    const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: currentPage - 1,
    pageSize: itemsPerPage,
  });

   useEffect(() => {
    setPagination((prev) => ({ ...prev, pageIndex: currentPage - 1 }));
  }, [searchQuery]);

    useEffect(() => {
        fetchApps(pagination.pageIndex + 1, pagination.pageSize, searchQuery);
    }, [fetchApps, pagination.pageIndex, pagination.pageSize, searchQuery]);

    const pageCountMath = Math.ceil(totalApps / pagination.pageSize);
    if (loading) return <div>Chargement...</div>;
    return (
        <div className="container mx-auto py-6">
        <DataTable columns={columns} data={apps} pageCount={pageCountMath} pagination={pagination} onPaginationChange={setPagination}/>
        </div>
    )
}
