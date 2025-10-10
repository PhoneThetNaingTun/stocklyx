import { DeleteDialog } from "@/components/delete-dialog";
import { showToast } from "@/components/toaster";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { useArchiveCustomerMutation } from "@/store/Apis/customerApi";
import { Customer } from "@/types/customer";
import { IconArchive, IconDotsVertical, IconEdit } from "@tabler/icons-react";
import { useState } from "react";
import { UpdateCustomerDialog } from "./UpdateCustomerDialog";

interface Props {
  data: Customer;
}

export const CustomerCellAction = ({ data }: Props) => {
  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [ArchiveCustomer, { isLoading }] = useArchiveCustomerMutation();
  const handleDelete = async () => {
    try {
      const responseData = await ArchiveCustomer({ id: data.id }).unwrap();
      showToast({
        title: responseData.message,
        type: "success",
      });
      setDeleteOpen(false);
    } catch (error: any) {
      if (error?.data?.message) {
        showToast({
          title: error.data.message[0],
          type: "error",
        });
      } else {
        showToast({
          title: "Something went wrong!",
          type: "error",
        });
      }
    }
  };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <IconDotsVertical />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuItem>Actions</DropdownMenuItem>
          <Separator />
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <IconEdit className="w-4 h-4" /> Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setDeleteOpen(true)}>
            <IconArchive className="w-4 h-4" /> Archive
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <UpdateCustomerDialog open={open} setOpen={setOpen} initialValue={data} />
      <DeleteDialog
        open={deleteOpen}
        setOpen={setDeleteOpen}
        title="Customer"
        isLoading={isLoading}
        handleDelete={handleDelete}
        archive
      />
    </div>
  );
};
