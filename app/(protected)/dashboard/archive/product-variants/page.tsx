import { IconCoin } from "@tabler/icons-react";
import { ProductPriceTable } from "../../products/product-prices/[id]/_components/productPriceTable";
import { productVariantArchiveColumns } from "./_components/column";

const MeasurementUnitArchives = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold flex gap-2 items-center">
        <IconCoin />
        <span>Archived Product Prices</span>
      </h2>

      <ProductPriceTable column={productVariantArchiveColumns} archivePage />
    </div>
  );
};

export default MeasurementUnitArchives;
