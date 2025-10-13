"use client";
import { ProductForm } from "@/components/forms/productform";
import { showToast } from "@/components/toaster";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { productSchema, ProductSchema } from "@/schema/productSchema";
import { useCreateProductMutation } from "@/store/Apis/productApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconPlus } from "@tabler/icons-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

export const NewProductDialog = () => {
  const [open, setOpen] = useState<boolean>(false);

  const [Create, { isLoading }] = useCreateProductMutation();

  const productForm = useForm<ProductSchema>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      product_name: "",
      description: "",
      categoryId: "",
      brandId: "",
      baseUnitId: "",
    },
    mode: "onBlur",
  });

  const handleSubmit = async (value: ProductSchema) => {
    try {
      const data = await Create(value).unwrap();

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
      <DialogTrigger asChild>
        <Button>
          <IconPlus className="w-4 h-4" /> New Product
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-screen overflow-y-scroll no-scrollbar">
        <DialogHeader>
          <DialogTitle>New Product</DialogTitle>
        </DialogHeader>
        <div>
          <ProductForm
            form={productForm}
            isLoading={isLoading}
            handleSubmit={handleSubmit}
            submitLabel="Create"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
