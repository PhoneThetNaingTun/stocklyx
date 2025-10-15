"use client";
import { useGetOneProductQuery } from "@/store/Apis/productApi";
import { useState } from "react";
import { NewProductVariantDialog } from "../../../_components/product-variants/NewProductVariant";

export const CreateProductPrice = ({ productId }: { productId: string }) => {
  const [open, setOpen] = useState<boolean>(false);

  const { data, isLoading } = useGetOneProductQuery(productId);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex flex-col md:flex-row md:items-center gap-3">
      <h3 className="text-lg md:text-xl font-semibold text-center">
        {data.product.product_name}
      </h3>
      <NewProductVariantDialog
        showButton
        product={data.product}
        open={open}
        setOpen={setOpen}
      />
    </div>
  );
};
