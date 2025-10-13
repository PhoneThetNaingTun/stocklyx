import { IconBox } from "@tabler/icons-react";
import { productColumns } from "../../products/_components/column";
import { ProductTable } from "../../products/_components/productTable";

const ProductArchives = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold flex gap-2 items-center">
        <IconBox />
        <span>Archived Products</span>
      </h2>

      <ProductTable column={productColumns} archivePage />
    </div>
  );
};

export default ProductArchives;
