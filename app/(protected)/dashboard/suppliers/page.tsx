import { Button } from "@/components/ui/button";
import { IconArchive, IconTruck } from "@tabler/icons-react";
import Link from "next/link";
import { supplierColumns } from "./_components/column";
import { NewSupplierDialog } from "./_components/NewSupplierDialog";
import { SupplierTable } from "./_components/supplierTable";

const Supplier = () => {
  return (
    <div>
      <div>
        <h2 className="text-2xl font-semibold flex gap-2 items-center">
          <IconTruck />
          <span>Suppliers</span>
        </h2>
      </div>
      <div className="flex justify-end items-center gap-3">
        <NewSupplierDialog />
        <Button variant={"outline"}>
          <Link
            href={"/dashboard/archive/suppliers"}
            className="flex items-center gap-2"
          >
            <IconArchive />
            <span>Archives</span>
          </Link>
        </Button>
      </div>
      <SupplierTable column={supplierColumns} archivePage={false} />
    </div>
  );
};

export default Supplier;
