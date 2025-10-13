"use client";
import { ProductForm } from "@/components/forms/productform";
import { showToast } from "@/components/toaster";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { productSchema, ProductSchema } from "@/schema/productSchema";
import { useUpdateProductMutation } from "@/store/Apis/productApi";
import { Product } from "@/types/product";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useForm } from "react-hook-form";

interface Prop {
  initialValue: Product;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export const UpdateProductDialog = ({ initialValue, open, setOpen }: Prop) => {
  const [Update, { isLoading }] = useUpdateProductMutation();

  const productForm = useForm<ProductSchema>({
    resolver: zodResolver(productSchema),
    defaultValues: initialValue,
    mode: "onBlur",
  });
  useEffect(() => {
    productForm.reset({
      ...initialValue,
    });
  }, [initialValue, productForm]);
  const handleSubmit = async (value: ProductSchema) => {
    try {
      const data = await Update({
        id: initialValue.id,
        ...value,
      }).unwrap();

      showToast({
        title: data.message,
        type: "success",
      });
      productForm.reset();
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
          <DialogTitle>Update Product</DialogTitle>
          <DialogDescription>Edit the product here.</DialogDescription>
        </DialogHeader>
        <div>
          <ProductForm
            form={productForm}
            isLoading={isLoading}
            handleSubmit={handleSubmit}
            submitLabel="Update"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
