"use client";
import { SupplierForm } from "@/components/forms/supplier-form";
import { showToast } from "@/components/toaster";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { StoreSchema } from "@/schema/storeSchema";
import { supplierSchema, SupplierSchema } from "@/schema/supplierSchema";
import { useUpdateSupplierMutation } from "@/store/Apis/supplierApi";
import { Supplier } from "@/types/supplier";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useForm } from "react-hook-form";

interface Prop {
  initialValue: Supplier;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export const UpdateSupplierDialog = ({ initialValue, open, setOpen }: Prop) => {
  const [Update, { isLoading }] = useUpdateSupplierMutation();

  const supplierForm = useForm<SupplierSchema>({
    resolver: zodResolver(supplierSchema),
    defaultValues: initialValue,
    mode: "onBlur",
  });
  useEffect(() => {
    supplierForm.reset({
      ...initialValue,
    });
  }, [initialValue, supplierForm]);
  const handleSubmit = async (value: StoreSchema) => {
    try {
      const data = await Update({
        id: initialValue.id,
        ...value,
      }).unwrap();

      showToast({
        title: data.message,
        type: "success",
      });
      supplierForm.reset();
      setOpen(false);
    } catch (error: any) {
      if (error?.data?.message) {
        showToast({
          title: error.data.message[0],
          type: "error",
        });
      } else {
        showToast({
          title: "An unexpected error occurred",
          type: "error",
        });
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-h-screen overflow-y-scroll no-scrollbar">
        <DialogHeader>
          <DialogTitle>Update Supplier</DialogTitle>
          <DialogDescription>Edit the supplier here.</DialogDescription>
        </DialogHeader>
        <div>
          <SupplierForm
            form={supplierForm}
            isLoading={isLoading}
            handleSubmit={handleSubmit}
            submitLabel="Update"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
