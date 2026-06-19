'use client'
import { useAppStore } from "@/app/store/appStore";
import { getColumns } from "./Appcolumns"
import { DataTable } from "./data-table"
import { useEffect, useMemo, useState } from "react";
import { PaginationState } from "@tanstack/react-table";

export default function AppTable() {
    const { apps, fetchApps, totalApps,currentPage,  itemsPerPage, loading, setAppToEdit, confirmStatus, confirmDelete } = useAppStore();
    const columns = useMemo(() => getColumns(setAppToEdit, confirmStatus, confirmDelete), [confirmStatus, confirmDelete]);
    const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: currentPage - 1,
    pageSize: itemsPerPage,
  });
    useEffect(() => {
        fetchApps(pagination.pageIndex + 1, pagination.pageSize);
    }, [fetchApps, pagination.pageIndex, pagination.pageSize]);
    const pageCountMath = Math.ceil(totalApps / pagination.pageSize);
    if (loading) return <div>Chargement...</div>;
    return (
        <div className="container mx-auto py-10">
        <DataTable columns={columns} data={apps} pageCount={pageCountMath} pagination={pagination} onPaginationChange={setPagination}/>
        </div>
    )
}
