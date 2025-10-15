"use client";

import { DataTable } from "@/components/data-table";
import { DeleteDialog } from "@/components/delete-dialog";
import { LoadingComp } from "@/components/LoadingComp";
import { RestoreDialog } from "@/components/restore-dialog";
import { showToast } from "@/components/toaster";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  useArchiveManyProductVariantMutation,
  useDeleteManyProductVariantMutation,
  useGetAllArchiveProductVariantsQuery,
  useGetAllProductVariantsByProductIdQuery,
  useRestoreManyProductVariantMutation,
} from "@/store/Apis/productVariantApi";
import { ProductVariant } from "@/types/product";
import { IconArchive, IconRestore, IconTrash } from "@tabler/icons-react";
import { ColumnDef, PaginationState } from "@tanstack/react-table";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useDebounce } from "use-debounce";

interface Props {
  column: ColumnDef<ProductVariant>[];
  archivePage: boolean;
  product_id?: string;
}

export const ProductPriceTable = ({
  column,
  archivePage,
  product_id,
}: Props) => {
  const params = useParams();
  const { id: productId } = params;
  const [selectedRows, setSelectedRows] = useState<ProductVariant[]>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [filter, setFilter] = useState<{ product_name: string }>({
    product_name: "",
  });
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
  const [restoreOpen, setRestoreOpen] = useState<boolean>(false);
  const [devounceProductName] = useDebounce(filter.product_name, 500);

  const { data, isLoading } = archivePage
    ? useGetAllArchiveProductVariantsQuery({
        page: pagination.pageIndex + 1,
        limit: pagination.pageSize,
        product_name: devounceProductName,
      })
    : useGetAllProductVariantsByProductIdQuery({
        page: pagination.pageIndex + 1,
        limit: pagination.pageSize,
        productId: product_id ?? productId,
      });
  const [Delete] = archivePage
    ? useDeleteManyProductVariantMutation()
    : useArchiveManyProductVariantMutation();

  const [Restore] = useRestoreManyProductVariantMutation();

  const handleDeleteMany = async () => {
    try {
      const ids = selectedRows.map((item) => item.id);
      if (ids.length === 0) {
        showToast({ title: "No variant selected", type: "error" });
        return;
      }
      const deletedData = await Delete({ productVariantIds: ids }).unwrap();
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
        showToast({ title: "No variant selected", type: "error" });
        return;
      }
      const restoreData = await Restore({
        productVariantIds: ids,
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
      {archivePage && (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-4 ">
          <Input
            placeholder="Filter with product name..."
            onChange={(e) => {
              setFilter({ ...filter, product_name: e.target.value });
              setPagination((prev) => ({ ...prev, pageIndex: 0 }));
            }}
          />
        </div>
      )}
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
              title="Product Variants"
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
                  title="Product Variants"
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
        data={data?.productVariants || []}
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
