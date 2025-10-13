"use client";

import { DataTable } from "@/components/data-table";
import { DeleteDialog } from "@/components/delete-dialog";
import { LoadingComp } from "@/components/LoadingComp";
import { RestoreDialog } from "@/components/restore-dialog";
import { showToast } from "@/components/toaster";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { useGetBrands } from "@/hooks/useGetBrands";
import { useGetCategories } from "@/hooks/useGetCategory";
import {
  useArchiveManyProductMutation,
  useDeleteManyProductMutation,
  useGetAllArchivedProductsQuery,
  useGetAllProductsQuery,
  useRestoreManyProductMutation,
} from "@/store/Apis/productApi";
import { Product } from "@/types/product";
import {
  IconArchive,
  IconArrowLeft,
  IconArrowRight,
  IconRestore,
  IconTrash,
  IconX,
} from "@tabler/icons-react";
import { ColumnDef, PaginationState } from "@tanstack/react-table";
import { useState } from "react";
import { useDebounce } from "use-debounce";

interface Props {
  column: ColumnDef<Product>[];
  archivePage: boolean;
}

export const ProductTable = ({ column, archivePage }: Props) => {
  const [selectedRows, setSelectedRows] = useState<Product[]>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const [filter, setFilter] = useState<{
    product_name: string;
    brandId: string;
    categoryId: string;
  }>({
    product_name: "",
    brandId: "",
    categoryId: "",
  });

  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
  const [restoreOpen, setRestoreOpen] = useState<boolean>(false);
  const [debounceProductName] = useDebounce(filter.product_name, 500);

  const {
    brands,
    isLoading: isLoadingBrands,
    totalPages: brandsTotalPages,
    handleNext: handleNextBrand,
    handlePrevious: handlePreviousBrand,
    handleSearchChange: handleSearchChangeBrand,
    page: brandsPage,
    search: brandsSearch,
  } = useGetBrands(1, 10);

  const {
    categories,
    isLoading: isLoadingCategories,
    totalPages: categoriesTotalPages,
    handleNext: handleNextCategory,
    handlePrevious: handlePreviousCategory,
    handleSearchChange: handleSearchChangeCategory,
    page: categoriesPage,
    search: categoriesSearch,
  } = useGetCategories(1, 10);

  const { data, isLoading } = archivePage
    ? useGetAllArchivedProductsQuery({
        page: pagination.pageIndex + 1,
        limit: pagination.pageSize,
        product_name: debounceProductName,
        brandId: filter.brandId,
        categoryId: filter.categoryId,
      })
    : useGetAllProductsQuery({
        page: pagination.pageIndex + 1,
        limit: pagination.pageSize,
        product_name: debounceProductName,
        brandId: filter.brandId,
        categoryId: filter.categoryId,
      });
  const [Delete] = archivePage
    ? useDeleteManyProductMutation()
    : useArchiveManyProductMutation();

  const [Restore] = useRestoreManyProductMutation();

  const handleDeleteMany = async () => {
    try {
      const ids = selectedRows.map((item) => item.id);
      if (ids.length === 0) {
        showToast({ title: "No product selected", type: "error" });
        return;
      }
      const deletedData = await Delete({ productIds: ids }).unwrap();
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
        showToast({ title: "No product selected", type: "error" });
        return;
      }
      const restoreData = await Restore({
        productIds: ids,
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
          placeholder="Filter product name..."
          value={filter.product_name}
          onChange={(e) => {
            setFilter({ ...filter, product_name: e.target.value });
            setPagination((prev) => ({ ...prev, pageIndex: 0 }));
          }}
          className="mb-4"
        />
        <Select
          onValueChange={(e) => setFilter({ ...filter, brandId: e })}
          value={filter.brandId || ""}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Brand " />
          </SelectTrigger>

          <SelectContent className="max-h-[200px]">
            <div className="flex gap-1 items-center">
              <Input
                onChange={(e) => {
                  handleSearchChangeBrand({
                    ...brandsSearch,
                    brand_name: e.target.value,
                  });
                }}
                value={brandsSearch.brand_name}
                placeholder="eg: Brand 1"
                className="flex-1"
              />
              {filter.brandId && (
                <Button
                  onClick={() => {
                    setFilter({
                      ...filter,
                      brandId: "",
                    });
                  }}
                >
                  <IconX size={20} />
                </Button>
              )}
            </div>

            {isLoadingBrands ? (
              <SelectItem
                disabled
                value="-"
                className="flex items-center justify-center"
              >
                <Spinner />
              </SelectItem>
            ) : (
              <>
                <div className="w-full flex items-center gap-2 justify-between">
                  <Button
                    disabled={brandsPage === 1 || isLoadingBrands}
                    onClick={handlePreviousBrand}
                    variant={"ghost"}
                  >
                    <IconArrowLeft />
                  </Button>
                  <span>
                    {brandsPage}/{brandsTotalPages}
                  </span>
                  <Button
                    disabled={
                      brandsPage === brandsTotalPages ||
                      isLoadingBrands ||
                      brandsTotalPages === 0
                    }
                    variant={"ghost"}
                    onClick={handleNextBrand}
                  >
                    <IconArrowRight />
                  </Button>
                </div>
                {brands.length > 0 ? (
                  <>
                    {brands.map((brand) => (
                      <SelectItem key={brand.id} value={brand.id}>
                        {brand.brand_name}
                      </SelectItem>
                    ))}
                  </>
                ) : (
                  <SelectItem
                    disabled
                    value="-"
                    className="flex items-center justify-center"
                  >
                    Is Empty
                  </SelectItem>
                )}
              </>
            )}
          </SelectContent>
        </Select>

        <Select
          onValueChange={(e) => setFilter({ ...filter, categoryId: e })}
          value={filter.categoryId || ""}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>

          <SelectContent className="max-h-[200px]">
            <div className="flex gap-1 items-center">
              <Input
                onChange={(e) => {
                  handleSearchChangeCategory({
                    ...categoriesSearch,
                    category_name: e.target.value,
                  });
                }}
                value={categoriesSearch.category_name}
                placeholder="eg: Drink"
                className="flex-1"
              />
              {filter.categoryId && (
                <Button
                  onClick={() => {
                    setFilter({ ...filter, categoryId: "" });
                  }}
                >
                  <IconX size={20} />
                </Button>
              )}
            </div>

            {isLoadingCategories ? (
              <SelectItem
                disabled
                value="-"
                className="flex items-center justify-center"
              >
                <Spinner />
              </SelectItem>
            ) : (
              <>
                <div className="w-full flex items-center gap-2 justify-between">
                  <Button
                    disabled={categoriesPage === 1 || isLoadingCategories}
                    onClick={handlePreviousCategory}
                    variant={"ghost"}
                  >
                    <IconArrowLeft />
                  </Button>
                  <span>
                    {categoriesPage}/{categoriesTotalPages}
                  </span>
                  <Button
                    disabled={
                      categoriesPage === categoriesTotalPages ||
                      isLoadingCategories ||
                      categoriesTotalPages === 0
                    }
                    variant={"ghost"}
                    onClick={handleNextCategory}
                  >
                    <IconArrowRight />
                  </Button>
                </div>
                {categories.length > 0 ? (
                  <>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.category_name}
                      </SelectItem>
                    ))}
                  </>
                ) : (
                  <SelectItem
                    disabled
                    value="-"
                    className="flex items-center justify-center"
                  >
                    Is Empty
                  </SelectItem>
                )}
              </>
            )}
          </SelectContent>
        </Select>
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
              title="Products"
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
                  title="Products"
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
        data={data?.products || []}
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
