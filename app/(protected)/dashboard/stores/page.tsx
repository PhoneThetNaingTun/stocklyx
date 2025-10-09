import { Button } from "@/components/ui/button";
import { IconArchive, IconBuildingStore } from "@tabler/icons-react";
import Link from "next/link";
import { storeColumns } from "./_components/column";
import { NewStoreDialog } from "./_components/NewStoreDialog";
import { StoreTable } from "./_components/storeTable";

const Store = () => {
  return (
    <div>
      <div>
        <h2 className="text-2xl font-semibold flex gap-2 items-center">
          <IconBuildingStore />
          <span>Stores</span>
        </h2>
      </div>
      <div className="flex justify-end items-center gap-3">
        <NewStoreDialog />
        <Button variant={"outline"}>
          <Link
            href={"/dashboard/archive/stores"}
            className="flex items-center gap-2"
          >
            <IconArchive />
            <span>Archives</span>
          </Link>
        </Button>
      </div>
      <StoreTable column={storeColumns} archivePage={false} />
    </div>
  );
};

export default Store;
