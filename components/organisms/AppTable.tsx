'use client'
import { useAppStore } from "@/app/store/appStore";
import { getColumns } from "./Appcolumns"
import { DataTable } from "./data-table"
import { useEffect, useMemo } from "react";
import { Application } from "@/app/features/types/app"

export default function AppTable() {
    const { apps, fetchApps, loading, setAppToEdit, confirmStatus, confirmDelete } = useAppStore();
    const columns = useMemo(() => getColumns(setAppToEdit, confirmStatus, confirmDelete), [confirmStatus, confirmDelete]);
    useEffect(() => {
        fetchApps();
    }, [fetchApps]);

    if (loading) return <div>Chargement...</div>;

    return (
        <div className="container mx-auto py-10">
        <DataTable columns={columns} data={apps} />
        </div>
    )
}
