"use client";

import { DataTable } from "@/components/data-table";
import { DeleteDialog } from "@/components/delete-dialog";
import { showToast } from "@/components/toaster";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  useDeleteManyStoreMutation,
  useGetAllStoreQuery,
} from "@/store/Apis/storeApi";
import { Store } from "@/types/store";
import { PaginationState } from "@tanstack/react-table";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import { storeColumns } from "./column";

export const StoreTable = () => {
  const [selectedRows, setSelectedRows] = useState<Store[]>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [filter, setFilter] = useState<{ store_name: string }>({
    store_name: "",
  });
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
  const [debounceStoreName] = useDebounce(filter.store_name, 500);

  const { data, isLoading } = useGetAllStoreQuery({
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
    store_name: debounceStoreName,
  });
  const [DeleteManyStore, { isLoading: deleteLoading }] =
    useDeleteManyStoreMutation();

  const handleDeleteMany = async () => {
    try {
      const ids = selectedRows.map((item) => item.id);
      if (ids.length === 0) {
        showToast({ title: "No store selected", type: "error" });
        return;
      }
      const deletedData = await DeleteManyStore({ storeIds: ids }).unwrap();
      showToast({ title: deletedData.message, type: "success" });
      setSelectedRows([]);
      setDeleteOpen(false);
    } catch (error: any) {
      if (error?.data) {
        showToast({ title: error.data.message[0], type: "error" });
        return;
      }
      showToast({ title: "Something went wrong", type: "error" });
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-4 ">
        <Input
          placeholder="Filter store name..."
          value={filter.store_name}
          onChange={(e) => {
            setFilter({ store_name: e.target.value });
            setPagination((prev) => ({ ...prev, pageIndex: 0 }));
          }}
          className="mb-4"
        />
      </div>
      {selectedRows.length > 0 && (
        <div className="flex items-center justify-between p-2 bg-red-100 rounded-sm mb-2">
          <div>
            {selectedRows.length}
            row(s) selected.
          </div>
          <div>
            <Button variant={"destructive"} onClick={() => setDeleteOpen(true)}>
              <Trash2 /> Delete
            </Button>
            <DeleteDialog
              title="stores"
              handleDelete={handleDeleteMany}
              isLoading={isLoading}
              open={deleteOpen}
              setOpen={setDeleteOpen}
            />
          </div>
        </div>
      )}
      <DataTable
        data={data?.stores || []}
        columns={storeColumns}
        setPagination={setPagination}
        pagination={pagination}
        totalPages={data?.totalPages ?? 1}
        onRowSelectionChange={setSelectedRows}
        resetSelection={selectedRows.length === 0}
      />
    </div>
  );
};
