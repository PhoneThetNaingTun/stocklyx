"use client";

import { DataTable } from "@/components/data-table";
import { DeleteDialog } from "@/components/delete-dialog";
import { LoadingComp } from "@/components/LoadingComp";
import { RestoreDialog } from "@/components/restore-dialog";
import { showToast } from "@/components/toaster";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  useArchiveManyCategoryMutation,
  useDeleteManyCategoryMutation,
  useGetAllArchivedCategoriesQuery,
  useGetAllCategoriesQuery,
  useRestoreManyCategoryMutation,
} from "@/store/Apis/categoryApi";
import { Category } from "@/types/category";
import { IconArchive, IconRestore, IconTrash } from "@tabler/icons-react";
import { ColumnDef, PaginationState } from "@tanstack/react-table";
import { useState } from "react";
import { useDebounce } from "use-debounce";

interface Props {
  column: ColumnDef<Category>[];
  archivePage: boolean;
}

export const CategoryTable = ({ column, archivePage }: Props) => {
  const [selectedRows, setSelectedRows] = useState<Category[]>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [filter, setFilter] = useState<{ category_name: string }>({
    category_name: "",
  });
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
  const [restoreOpen, setRestoreOpen] = useState<boolean>(false);
  const [debounceCategoryName] = useDebounce(filter.category_name, 500);

  const { data, isLoading } = archivePage
    ? useGetAllArchivedCategoriesQuery({
        page: pagination.pageIndex + 1,
        limit: pagination.pageSize,
        store_name: debounceCategoryName,
      })
    : useGetAllCategoriesQuery({
        page: pagination.pageIndex + 1,
        limit: pagination.pageSize,
        category_name: debounceCategoryName,
      });
  const [DeleteStores] = archivePage
    ? useDeleteManyCategoryMutation()
    : useArchiveManyCategoryMutation();

  const [RestoerManyCategory] = useRestoreManyCategoryMutation();

  const handleDeleteMany = async () => {
    try {
      const ids = selectedRows.map((item) => item.id);
      if (ids.length === 0) {
        showToast({ title: "No store selected", type: "error" });
        return;
      }
      const deletedData = await DeleteStores({ categoryIds: ids }).unwrap();
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

  const handleRestoreStores = async () => {
    try {
      const ids = selectedRows.map((item) => item.id);
      if (ids.length === 0) {
        showToast({ title: "No Category selected", type: "error" });
        return;
      }
      const restoreData = await RestoerManyCategory({
        categoryIds: ids,
      }).unwrap();
      showToast({ title: restoreData.message, type: "success" });
      setSelectedRows([]);
      setRestoreOpen(false);
    } catch (error: any) {
      if (error?.data) {
        showToast({ title: error.data.message[0], type: "error" });
        return;
      }
      showToast({ title: "Something went wrong", type: "error" });
    }
  };

  if (isLoading) {
    return <LoadingComp />;
  }

  return (
    <div>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-4 ">
        <Input
          placeholder="Filter category name..."
          value={filter.category_name}
          onChange={(e) => {
            setFilter({ category_name: e.target.value });
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
              {archivePage ? (
                <>
                  <IconTrash /> Delete
                </>
              ) : (
                <>
                  {" "}
                  <IconArchive /> Archive
                </>
              )}
            </Button>
            <DeleteDialog
              title="stores"
              handleDelete={handleDeleteMany}
              isLoading={isLoading}
              open={deleteOpen}
              setOpen={setDeleteOpen}
              archive={!archivePage}
            />
            {archivePage && (
              <>
                <Button
                  className="bg-green-500 ml-2"
                  onClick={() => setRestoreOpen(true)}
                >
                  <IconRestore /> Restore
                </Button>
                <RestoreDialog
                  title="Stores"
                  handleRestore={handleRestoreStores}
                  isLoading={isLoading}
                  open={restoreOpen}
                  setOpen={setRestoreOpen}
                />
              </>
            )}
          </div>
        </div>
      )}
      <DataTable
        data={data?.categories || []}
        columns={column}
        setPagination={setPagination}
        pagination={pagination}
        totalPages={data?.totalPages ?? 1}
        onRowSelectionChange={setSelectedRows}
        resetSelection={selectedRows.length === 0}
      />
    </div>
  );
};
