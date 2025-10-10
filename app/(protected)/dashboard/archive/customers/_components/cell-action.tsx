import { DeleteDialog } from "@/components/delete-dialog";
import { RestoreDialog } from "@/components/restore-dialog";
import { showToast } from "@/components/toaster";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import {
  useDeleteCustomerMutation,
  useRestoreCustomerMutation,
} from "@/store/Apis/customerApi";
import { Customer } from "@/types/customer";
import { IconDotsVertical, IconRestore, IconTrash } from "@tabler/icons-react";
import { useState } from "react";

interface Props {
  data: Customer;
}

export const ArchiveCustomerCellAction = ({ data }: Props) => {
  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [DeleteCustomer, { isLoading }] = useDeleteCustomerMutation();
  const [RestoreCustomer, { isLoading: RestoreLoading }] =
    useRestoreCustomerMutation();
  const handleDelete = async () => {
    try {
      const responseData = await DeleteCustomer({ id: data.id }).unwrap();
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
  const handleRestore = async () => {
    try {
      const responseData = await RestoreCustomer({ id: data.id }).unwrap();
      showToast({
        title: responseData.message,
        type: "success",
      });
      setOpen(false);
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
            <IconRestore className="w-4 h-4" /> Restore
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setDeleteOpen(true)}>
            <IconTrash className="w-4 h-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <RestoreDialog
        open={open}
        setOpen={setOpen}
        title="Customer"
        handleRestore={handleRestore}
        isLoading={RestoreLoading}
      />
      <DeleteDialog
        open={deleteOpen}
        setOpen={setDeleteOpen}
        title="Customer"
        isLoading={isLoading}
        handleDelete={handleDelete}
        archive={false}
      />
    </div>
  );
};
