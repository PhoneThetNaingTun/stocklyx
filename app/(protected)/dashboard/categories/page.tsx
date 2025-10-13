import { Button } from "@/components/ui/button";
import { IconArchive, IconCategory2 } from "@tabler/icons-react";
import Link from "next/link";
import { CategoryTable } from "./_components/categoryTable";
import { categoryColumns } from "./_components/column";
import { NewCategoryDialog } from "./_components/NewCategoryDialog";

const Categories = () => {
  return (
    <div>
      <div>
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          <IconCategory2 />
          Categories
        </h2>
      </div>
      <div className="flex flex-col md:flex-row  justify-end md:items-center gap-3">
        <NewCategoryDialog />
        <Button variant={"outline"}>
          <Link
            href={"/dashboard/archive/categories"}
            className="flex items-center gap-2"
          >
            <IconArchive />
            <span>Archives</span>
          </Link>
        </Button>
      </div>
      <CategoryTable column={categoryColumns} archivePage={false} />
    </div>
  );
};

export default Categories;
