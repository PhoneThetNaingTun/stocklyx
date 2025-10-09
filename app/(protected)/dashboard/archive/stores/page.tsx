import { IconBuildingStore } from "@tabler/icons-react";
import { storeColumns } from "../../stores/_components/column";
import { StoreTable } from "../../stores/_components/storeTable";

const StoreArchives = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold flex gap-2 items-center">
        <IconBuildingStore />
        <span>Archived Stores</span>
      </h2>

      <StoreTable column={storeColumns} archivePage />
    </div>
  );
};

export default StoreArchives;
