import { Button } from "@/components/ui/button";
import { IconArchive, IconUsers } from "@tabler/icons-react";
import Link from "next/link";
import { customerColumns } from "./_components/column";
import { CustomerTable } from "./_components/customerTable";
import { NewCustomerDialog } from "./_components/NewCustomerDialog";

const Customer = () => {
  return (
    <div>
      <div>
        <h2 className="text-2xl font-semibold flex gap-2 items-center">
          <IconUsers />
          <span>Customers</span>
        </h2>
      </div>
      <div className="flex flex-col md:flex-row  justify-end md:items-center  gap-3">
        <NewCustomerDialog />
        <Button variant={"outline"}>
          <Link
            href={"/dashboard/archive/customers"}
            className="flex items-center gap-2"
          >
            <IconArchive />
            <span>Archives</span>
          </Link>
        </Button>
      </div>
      <CustomerTable column={customerColumns} archivePage={false} />
    </div>
  );
};

export default Customer;
