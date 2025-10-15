"use client";
import { ProductVariantMultipleForm } from "@/components/forms/product-variant-multiple-form";
import { showToast } from "@/components/toaster";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  productVariantMultipleSchema,
  ProductVariantMultipleSchema,
} from "@/schema/productVariantMultipleSchema";
import { useCreateMultipleProductVariantsMutation } from "@/store/Apis/productVariantApi";
import { Product } from "@/types/product";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconPlus } from "@tabler/icons-react";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";

interface Prop {
  product: Product;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  showButton: boolean;
}

export const NewProductVariantDialog = ({
  product,
  open,
  setOpen,
  showButton,
}: Prop) => {
  const [Create, { isLoading }] = useCreateMultipleProductVariantsMutation();
  const productVariantForm = useForm<ProductVariantMultipleSchema>({
    resolver: zodResolver(productVariantMultipleSchema),
    defaultValues: {
      productId: product.id,
      variants: [
        {
          variant_name: "",
          saleUnitId: "",
          quantityPerUnit: 0,
          sale_price: 0,
          purchase_price: 0,
          sku: "",
          barcode: "",
        },
      ],
    },
    mode: "onBlur",
  });

  const handleSubmit = async (value: ProductVariantMultipleSchema) => {
    try {
      const data = await Create(value).unwrap();

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
      {showButton && (
        <DialogTrigger asChild>
          <Button>
            <IconPlus className="w-4 h-4" /> Add Price
          </Button>
        </DialogTrigger>
      )}
      <DialogContent className="max-h-screen  no-scrollbar">
        <DialogHeader>
          <DialogTitle>
            Add Price for{" "}
            <span className="text-2xl">{product.product_name}</span>
          </DialogTitle>
        </DialogHeader>
        <div>
          <ProductVariantMultipleForm
            form={productVariantForm}
            isLoading={isLoading}
            handleSubmit={handleSubmit}
            submitLabel="Create"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
