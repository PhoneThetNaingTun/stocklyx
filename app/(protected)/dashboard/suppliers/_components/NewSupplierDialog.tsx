"use client";
import { SupplierForm } from "@/components/forms/supplier-form";
import { showToast } from "@/components/toaster";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { StoreSchema } from "@/schema/storeSchema";
import { supplierSchema, SupplierSchema } from "@/schema/supplierSchema";
import { useCreateSupplierMutation } from "@/store/Apis/supplierApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconPlus } from "@tabler/icons-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

export const NewSupplierDialog = () => {
  const [open, setOpen] = useState<boolean>(false);

  const [Create, { isLoading }] = useCreateSupplierMutation();

  const supplierForm = useForm<SupplierSchema>({
    resolver: zodResolver(supplierSchema),
    defaultValues: {
      supplier_name: "",
      supplier_email: "",
      supplier_phone: "",
      supplier_address: "",
      supplier_city: "",
      supplier_country: "",
    },
    mode: "onBlur",
  });

  const handleSubmit = async (value: StoreSchema) => {
    try {
      const data = await Create(value).unwrap();

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
      <DialogTrigger asChild>
        <Button>
          <IconPlus className="w-4 h-4" /> New Supplier
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-screen overflow-y-scroll no-scrollbar">
        <DialogHeader>
          <DialogTitle>New Supplier</DialogTitle>
        </DialogHeader>
        <div>
          <SupplierForm
            form={supplierForm}
            isLoading={isLoading}
            handleSubmit={handleSubmit}
            submitLabel="Create"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
