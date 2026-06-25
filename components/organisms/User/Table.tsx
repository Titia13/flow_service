'use client'
import { useEffect, useMemo, useState } from "react";
import { PaginationState } from "@tanstack/react-table";
import { getColumns } from "./Columns";
import { DataTable } from "./data-table";
import { useUserStore } from "@/app/store/userStore";

interface Props {
  searchQuery: string;
}

export default function Table({ searchQuery }: Props) {
  const { users, fetchUsers, pageCount, currentPage, itemsPerPage, setUserToEdit, confirmDelete, confirmStatus } = useUserStore();
  const columns = useMemo(() => getColumns(setUserToEdit, confirmDelete, confirmStatus), [confirmDelete, confirmStatus]);

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: currentPage - 1,
    pageSize: itemsPerPage,
  });

  useEffect(() => {
    setPagination((prev) => ({ ...prev, pageIndex: currentPage - 1 }));
  }, [searchQuery]);

  useEffect(() => {
    fetchUsers(pagination.pageIndex + 1, pagination.pageSize, searchQuery);
  }, [fetchUsers, pagination.pageIndex, pagination.pageSize, searchQuery]);
  return (
    <div className="container mx-auto py-6">
      <DataTable columns={columns} data={users} pageCount={pageCount} pagination={pagination} onPaginationChange={setPagination} />
    </div>
  )
}
