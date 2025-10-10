import { IconBuildingStore } from "@tabler/icons-react";
import { BrandTable } from "../../brands/_components/brandTable";
import { brandColumns } from "../../brands/_components/column";

const BrandArchives = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold flex gap-2 items-center">
        <IconBuildingStore />
        <span>Archived Brands</span>
      </h2>

      <BrandTable column={brandColumns} archivePage />
    </div>
  );
};

export default BrandArchives;
