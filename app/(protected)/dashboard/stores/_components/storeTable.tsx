"use client";

import { DataTable } from "@/components/data-table";
import { Input } from "@/components/ui/input";
import { useGetAllStoreQuery } from "@/store/Apis/storeApi";
import { PaginationState } from "@tanstack/react-table";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import { storeColumns } from "./column";

export const StoreTable = () => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [filter, setFilter] = useState<{ store_name: string }>({
    store_name: "",
  });
  const [debounceStoreName] = useDebounce(filter.store_name, 500);
  const { data, isLoading } = useGetAllStoreQuery({
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
    store_name: debounceStoreName,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-4 ">
        <Input
          placeholder="Filter store name..."
          value={filter.store_name}
          onChange={(e) => setFilter({ store_name: e.target.value })}
          className="mb-4"
        />
      </div>

      <DataTable
        data={data?.stores || []}
        columns={storeColumns}
        setPagination={setPagination}
        pagination={pagination}
        totalPages={data?.totalPages ?? 1}
      />
    </div>
  );
};
