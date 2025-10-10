import { IconUsers } from "@tabler/icons-react";
import { customerColumns } from "../../customers/_components/column";
import { CustomerTable } from "../../customers/_components/customerTable";

const CustomerArchives = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold flex gap-2 items-center">
        <IconUsers />
        <span>Archived Customers</span>
      </h2>

      <CustomerTable column={customerColumns} archivePage />
    </div>
  );
};

export default CustomerArchives;
