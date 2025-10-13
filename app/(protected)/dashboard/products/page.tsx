import { Button } from "@/components/ui/button";
import { IconArchive, IconBox } from "@tabler/icons-react";
import Link from "next/link";
import { productColumns } from "./_components/column";
import { NewProductDialog } from "./_components/NewProductDialog";
import { ProductTable } from "./_components/productTable";

const Product = () => {
  return (
    <div>
      <div>
        <h2 className="text-2xl font-semibold flex gap-2 items-center">
          <IconBox />
          <span>Products</span>
        </h2>
      </div>
      <div className="flex flex-col md:flex-row  justify-end md:items-center  gap-3">
        <NewProductDialog />
        <Button variant={"outline"}>
          <Link
            href={"/dashboard/archive/products"}
            className="flex items-center gap-2"
          >
            <IconArchive />
            <span>Archives</span>
          </Link>
        </Button>
      </div>
      <ProductTable column={productColumns} archivePage={false} />
    </div>
  );
};

export default Product;
