import { Button } from "@/components/ui/button";
import { IconArchive, IconCategory2 } from "@tabler/icons-react";
import Link from "next/link";

import { BrandTable } from "./_components/brandTable";
import { brandColumns } from "./_components/column";
import { NewBrandDialog } from "./_components/NewBrandDialog";

const Brands = () => {
  return (
    <div>
      <div>
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          <IconCategory2 />
          Brands
        </h2>
      </div>
      <div className="flex justify-end gap-3">
        <NewBrandDialog />
        <Button variant={"outline"}>
          <Link
            href={"/dashboard/archive/brands"}
            className="flex items-center gap-2"
          >
            <IconArchive />
            <span>Archives</span>
          </Link>
        </Button>
      </div>
      <BrandTable column={brandColumns} archivePage={false} />
    </div>
  );
};

export default Brands;
