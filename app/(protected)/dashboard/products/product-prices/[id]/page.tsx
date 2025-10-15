import { Button } from "@/components/ui/button";
import { IconArchive, IconCoin } from "@tabler/icons-react";
import Link from "next/link";
import { productVariantColumns } from "./_components/column";
import { CreateProductPrice } from "./_components/createProductPrice";
import { ProductPriceTable } from "./_components/productPriceTable";

const ProductPrice = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const id = await (await params).id;
  return (
    <div>
      <div>
        <h2 className="text-2xl font-semibold flex gap-2 items-center">
          <IconCoin />
          <span>Product Price</span>
        </h2>
      </div>
      <div className="flex flex-col md:flex-row  justify-end md:items-center  gap-3">
        <CreateProductPrice productId={id} />
        <Button variant={"outline"}>
          <Link
            href={"/dashboard/archive/product-variants"}
            className="flex items-center gap-2"
          >
            <IconArchive />
            <span>Archives</span>
          </Link>
        </Button>
      </div>
      <ProductPriceTable column={productVariantColumns} archivePage={false} />
    </div>
  );
};

export default ProductPrice;
