"use client";
import { ProductVariantForm } from "@/components/forms/product-variant-form";
import { showToast } from "@/components/toaster";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  productVariantSchema,
  ProductVariantSchema,
} from "@/schema/productVariantSchema";
import { useUpdateProductVariantMutation } from "@/store/Apis/productVariantApi";
import { ProductVariant } from "@/types/product";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useForm } from "react-hook-form";

interface Prop {
  initialValue: ProductVariant;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export const UpdateProductVariantDialog = ({
  initialValue,
  open,
  setOpen,
}: Prop) => {
  const [Update, { isLoading }] = useUpdateProductVariantMutation();

  const productVariantForm = useForm<ProductVariantSchema>({
    resolver: zodResolver(productVariantSchema),
    defaultValues: initialValue,
    mode: "onBlur",
  });
  useEffect(() => {
    productVariantForm.reset({
      ...initialValue,
    });
  }, [initialValue, productVariantForm]);
  const handleSubmit = async (value: ProductVariantSchema) => {
    try {
      const data = await Update({
        id: initialValue.id,
        ...value,
      }).unwrap();

      showToast({
        title: data.message,
        type: "success",
      });
      productVariantForm.reset();
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
          <DialogTitle>Update Measurement Unit</DialogTitle>
          <DialogDescription>Edit the unit here.</DialogDescription>
        </DialogHeader>
        <div>
          <ProductVariantForm
            form={productVariantForm}
            isLoading={isLoading}
            handleSubmit={handleSubmit}
            submitLabel="Update"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
