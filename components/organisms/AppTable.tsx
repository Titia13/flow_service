'use client'
import { useAppStore } from "@/app/store/appStore";
import { columns } from "./Appcolumns"
import { DataTable } from "./data-table"
import { useEffect } from "react";

export default function AppTable() {
    const { apps, fetchApps, loading } = useAppStore();
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
