"use client";

import { DataTable } from "@/components/data-table";
import { DeleteDialog } from "@/components/delete-dialog";
import { LoadingComp } from "@/components/LoadingComp";
import { RestoreDialog } from "@/components/restore-dialog";
import { showToast } from "@/components/toaster";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  useArchiveManySupplierMutation,
  useDeleteManySupplierMutation,
  useGetAllArchivedSupplierQuery,
  useGetAllSuppliersQuery,
  useRestoreManySupplierMutation,
} from "@/store/Apis/supplierApi";
import { Supplier } from "@/types/supplier";
import { IconArchive, IconRestore, IconTrash } from "@tabler/icons-react";
import { ColumnDef, PaginationState } from "@tanstack/react-table";
import { useState } from "react";
import { useDebounce } from "use-debounce";

interface Props {
  column: ColumnDef<Supplier>[];
  archivePage: boolean;
}

export const SupplierTable = ({ column, archivePage }: Props) => {
  const [selectedRows, setSelectedRows] = useState<Supplier[]>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [filter, setFilter] = useState<
    Omit<Supplier, "id" | "createdAt" | "updatedAt">
  >({
    supplier_name: "",
    supplier_email: "",
    supplier_phone: "",
    supplier_address: "",
    supplier_city: "",
    supplier_country: "",
  });
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
  const [restoreOpen, setRestoreOpen] = useState<boolean>(false);
  const [debounceSupplierName] = useDebounce(filter.supplier_name, 500);
  const [debounceSupplierEmail] = useDebounce(filter.supplier_email, 500);
  const [debounceSupplierPhone] = useDebounce(filter.supplier_phone, 500);
  const [debounceSupplierAddress] = useDebounce(filter.supplier_address, 500);
  const [debounceSupplierCity] = useDebounce(filter.supplier_city, 500);
  const [debounceSupplierCountry] = useDebounce(filter.supplier_country, 500);

  const { data, isLoading } = archivePage
    ? useGetAllArchivedSupplierQuery({
        page: pagination.pageIndex + 1,
        limit: pagination.pageSize,
        supplier_name: debounceSupplierName,
        supplier_email: debounceSupplierEmail,
        supplier_phone: debounceSupplierPhone,
        supplier_address: debounceSupplierAddress,
        supplier_city: debounceSupplierCity,
        supplier_country: debounceSupplierCountry,
      })
    : useGetAllSuppliersQuery({
        page: pagination.pageIndex + 1,
        limit: pagination.pageSize,
        supplier_name: debounceSupplierName,
        supplier_email: debounceSupplierEmail,
        supplier_phone: debounceSupplierPhone,
        supplier_address: debounceSupplierAddress,
        supplier_city: debounceSupplierCity,
        supplier_country: debounceSupplierCountry,
      });
  const [Delete] = archivePage
    ? useDeleteManySupplierMutation()
    : useArchiveManySupplierMutation();

  const [Restore] = useRestoreManySupplierMutation();

  const handleDeleteMany = async () => {
    try {
      const ids = selectedRows.map((item) => item.id);
      if (ids.length === 0) {
        showToast({ title: "No supplier selected", type: "error" });
        return;
      }
      const deletedData = await Delete({ supplierIds: ids }).unwrap();
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
        showToast({ title: "No supplier selected", type: "error" });
        return;
      }
      const restoreData = await Restore({
        supplierIds: ids,
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
          placeholder="Filter supplier name..."
          value={filter.supplier_name}
          onChange={(e) => {
            setFilter({ ...filter, supplier_name: e.target.value });
            setPagination((prev) => ({ ...prev, pageIndex: 0 }));
          }}
          className="mb-4"
        />

        <Input
          placeholder="Filter supplier email..."
          value={filter.supplier_email}
          onChange={(e) => {
            setFilter({ ...filter, supplier_email: e.target.value });
            setPagination((prev) => ({ ...prev, pageIndex: 0 }));
          }}
          className="mb-4"
        />

        <Input
          placeholder="Filter supplier phone..."
          value={filter.supplier_phone}
          onChange={(e) => {
            setFilter({ ...filter, supplier_phone: e.target.value });
            setPagination((prev) => ({ ...prev, pageIndex: 0 }));
          }}
          className="mb-4"
        />

        <Input
          placeholder="Filter supplier address..."
          value={filter.supplier_address}
          onChange={(e) => {
            setFilter({ ...filter, supplier_address: e.target.value });
            setPagination((prev) => ({ ...prev, pageIndex: 0 }));
          }}
          className="mb-4"
        />

        <Input
          placeholder="Filter supplier city..."
          value={filter.supplier_city}
          onChange={(e) => {
            setFilter({ ...filter, supplier_city: e.target.value });
            setPagination((prev) => ({ ...prev, pageIndex: 0 }));
          }}
          className="mb-4"
        />

        <Input
          placeholder="Filter supplier country..."
          value={filter.supplier_country}
          onChange={(e) => {
            setFilter({ ...filter, supplier_country: e.target.value });
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
              title="Suppliers"
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
                  title="Suppliers"
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
        data={data?.suppliers || []}
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
