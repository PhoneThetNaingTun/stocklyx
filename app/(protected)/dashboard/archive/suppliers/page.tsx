import { IconTruck } from "@tabler/icons-react";
import { supplierColumns } from "../../suppliers/_components/column";
import { SupplierTable } from "../../suppliers/_components/supplierTable";

const SupplierArchives = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold flex gap-2 items-center">
        <IconTruck />
        <span>Archived Supplier</span>
      </h2>

      <SupplierTable column={supplierColumns} archivePage />
    </div>
  );
};

export default SupplierArchives;
