"use client";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Product } from "@/types/product";
import { IconArchive, IconCoin } from "@tabler/icons-react";
import Link from "next/link";
import { productVariantColumns } from "../product-prices/[id]/_components/column";
import { CreateProductPrice } from "../product-prices/[id]/_components/createProductPrice";
import { ProductPriceTable } from "../product-prices/[id]/_components/productPriceTable";

interface Prop {
  product: Product;
}
export const ProductPriceDrawer = ({ product }: Prop) => {
  return (
    <Drawer direction="bottom">
      <DrawerTrigger asChild>
        <Button variant="link" className="text-foreground w-fit px-0 text-left">
          {product.product_name}
        </Button>
      </DrawerTrigger>
      <DrawerContent className="min-h-[80vh] ">
        <DrawerHeader>
          <DrawerTitle className="text-lg sm:text-2xl flex justify-center items-center">
            <div className="flex items-center gap-3">
              <IconCoin /> Prices of {product.product_name}
            </div>
          </DrawerTitle>
          <DrawerDescription>A list of product prices</DrawerDescription>
        </DrawerHeader>
        <div className="px-3 pb-10 overflow-y-scroll no-scrollbar">
          <div className="flex flex-col sm:flex-row justify-end sm:items-center gap-3">
            <CreateProductPrice productId={product.id} />

            <Button variant={"outline"} className="sm:w-fit">
              <Link
                href={"/dashboard/archive/product-variants"}
                className="flex items-center gap-2"
              >
                <IconArchive />
                <span>Archives</span>
              </Link>
            </Button>
          </div>

          <ProductPriceTable
            column={productVariantColumns}
            archivePage={false}
            product_id={product.id}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
};
