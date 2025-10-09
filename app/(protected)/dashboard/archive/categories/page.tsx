import { IconBuildingStore } from "@tabler/icons-react";
import { CategoryTable } from "../../categories/_components/categoryTable";
import { categoryColumns } from "../../categories/_components/column";

const CategoryArchives = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold flex gap-2 items-center">
        <IconBuildingStore />
        <span>Archived Categories</span>
      </h2>

      <CategoryTable column={categoryColumns} archivePage />
    </div>
  );
};

export default CategoryArchives;
