"use client";
import { BrandForm } from "@/components/forms/brand-form";
import { showToast } from "@/components/toaster";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { brandSchema, BrandSchema } from "@/schema/brandSchema";
import { useUpdateBrandMutation } from "@/store/Apis/brandApi";
import { Brand } from "@/types/brand";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useForm } from "react-hook-form";

interface Prop {
  initialValue: Brand;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export const UpdateBrandDialog = ({ initialValue, open, setOpen }: Prop) => {
  const [updateBrand, { isLoading }] = useUpdateBrandMutation();

  const brandForm = useForm<BrandSchema>({
    resolver: zodResolver(brandSchema),
    defaultValues: initialValue,
    mode: "onBlur",
  });
  useEffect(() => {
    brandForm.reset({
      ...initialValue,
    });
  }, [initialValue, brandForm]);
  const handleSubmit = async (value: BrandSchema) => {
    try {
      const data = await updateBrand({
        id: initialValue.id,
        ...value,
      }).unwrap();

      showToast({
        title: data.message,
        type: "success",
      });
      brandForm.reset();
      setOpen(false);
    } catch (error: any) {
      if (error?.data?.message) {
        showToast({
          title: error.data.message[0],
          type: "error",
        });
      } else {
        showToast({
          title: "Something went wrong!",
          type: "error",
        });
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-h-screen overflow-y-scroll no-scrollbar">
        <DialogHeader>
          <DialogTitle>Update Brand</DialogTitle>
          <DialogDescription>Edit the brand here.</DialogDescription>
        </DialogHeader>
        <div>
          <BrandForm
            form={brandForm}
            isLoading={isLoading}
            handleSubmit={handleSubmit}
            submitLabel="Update"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
