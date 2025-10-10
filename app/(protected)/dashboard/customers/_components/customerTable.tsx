"use client";

import { DataTable } from "@/components/data-table";
import { DeleteDialog } from "@/components/delete-dialog";
import { LoadingComp } from "@/components/LoadingComp";
import { RestoreDialog } from "@/components/restore-dialog";
import { showToast } from "@/components/toaster";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  useArchiveManyCustomerMutation,
  useDeleteManyCustomerMutation,
  useGetAllArchivedCustomersQuery,
  useGetAllCustomersQuery,
  useRestoreManyCustomerMutation,
} from "@/store/Apis/customerApi";
import { Customer } from "@/types/customer";
import { IconArchive, IconRestore, IconTrash } from "@tabler/icons-react";
import { ColumnDef, PaginationState } from "@tanstack/react-table";
import { useState } from "react";
import { useDebounce } from "use-debounce";

interface Props {
  column: ColumnDef<Customer>[];
  archivePage: boolean;
}

export const CustomerTable = ({ column, archivePage }: Props) => {
  const [selectedRows, setSelectedRows] = useState<Customer[]>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [filter, setFilter] = useState<
    Omit<Customer, "id" | "createdAt" | "updatedAt">
  >({
    customer_name: "",
    customer_email: "",
    customer_phone: "",
    customer_address: "",
    customer_city: "",
    customer_country: "",
  });
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
  const [restoreOpen, setRestoreOpen] = useState<boolean>(false);
  const [debounceCustomerName] = useDebounce(filter.customer_name, 500);
  const [debounceCustomerEmail] = useDebounce(filter.customer_email, 500);
  const [debounceCustomerPhone] = useDebounce(filter.customer_phone, 500);
  const [debounceCustomerAddress] = useDebounce(filter.customer_address, 500);
  const [debounceCustomerCity] = useDebounce(filter.customer_city, 500);
  const [debounceCustomerCountry] = useDebounce(filter.customer_country, 500);

  const { data, isLoading } = archivePage
    ? useGetAllArchivedCustomersQuery({
        page: pagination.pageIndex + 1,
        limit: pagination.pageSize,
        customer_name: debounceCustomerName,
        customer_email: debounceCustomerEmail,
        customer_phone: debounceCustomerPhone,
        customer_address: debounceCustomerAddress,
        customer_city: debounceCustomerCity,
        customer_country: debounceCustomerCountry,
      })
    : useGetAllCustomersQuery({
        page: pagination.pageIndex + 1,
        limit: pagination.pageSize,
        customer_name: debounceCustomerName,
        customer_email: debounceCustomerEmail,
        customer_phone: debounceCustomerPhone,
        customer_address: debounceCustomerAddress,
        customer_city: debounceCustomerCity,
        customer_country: debounceCustomerCountry,
      });
  const [Delete] = archivePage
    ? useDeleteManyCustomerMutation()
    : useArchiveManyCustomerMutation();

  const [Restore] = useRestoreManyCustomerMutation();

  const handleDeleteMany = async () => {
    try {
      const ids = selectedRows.map((item) => item.id);
      if (ids.length === 0) {
        showToast({ title: "No customer selected", type: "error" });
        return;
      }
      const deletedData = await Delete({ customerIds: ids }).unwrap();
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
        showToast({ title: "No customer selected", type: "error" });
        return;
      }
      const restoreData = await Restore({
        customerIds: ids,
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
          placeholder="Filter customer name..."
          value={filter.customer_name}
          onChange={(e) => {
            setFilter({ ...filter, customer_name: e.target.value });
            setPagination((prev) => ({ ...prev, pageIndex: 0 }));
          }}
          className="mb-4"
        />

        <Input
          placeholder="Filter customer email..."
          value={filter.customer_email}
          onChange={(e) => {
            setFilter({ ...filter, customer_email: e.target.value });
            setPagination((prev) => ({ ...prev, pageIndex: 0 }));
          }}
          className="mb-4"
        />

        <Input
          placeholder="Filter customer phone..."
          value={filter.customer_phone}
          onChange={(e) => {
            setFilter({ ...filter, customer_phone: e.target.value });
            setPagination((prev) => ({ ...prev, pageIndex: 0 }));
          }}
          className="mb-4"
        />

        <Input
          placeholder="Filter customer address..."
          value={filter.customer_address}
          onChange={(e) => {
            setFilter({ ...filter, customer_address: e.target.value });
            setPagination((prev) => ({ ...prev, pageIndex: 0 }));
          }}
          className="mb-4"
        />

        <Input
          placeholder="Filter customer city..."
          value={filter.customer_city}
          onChange={(e) => {
            setFilter({ ...filter, customer_city: e.target.value });
            setPagination((prev) => ({ ...prev, pageIndex: 0 }));
          }}
          className="mb-4"
        />

        <Input
          placeholder="Filter customer country..."
          value={filter.customer_country}
          onChange={(e) => {
            setFilter({ ...filter, customer_country: e.target.value });
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
              title="Customers"
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
                  title="Customers"
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
        data={data?.customers || []}
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
