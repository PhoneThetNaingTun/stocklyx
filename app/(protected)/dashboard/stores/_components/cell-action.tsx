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
import { useDeleteStoreMutation } from "@/store/Apis/storeApi";
import { Store } from "@/types/store";
import { EllipsisVertical, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { UpdateStoreDialog } from "./UpdateStoreDialog";

interface Props {
  data: Store;
}

export const StoreCellAction = ({ data }: Props) => {
  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [DeleteStore, { isLoading }] = useDeleteStoreMutation();
  const handleDelete = async () => {
    try {
      const responseData = await DeleteStore({ id: data.id }).unwrap();
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
            <EllipsisVertical />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuItem>Actions</DropdownMenuItem>
          <Separator />
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Pencil className="w-4 h-4" /> Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setDeleteOpen(true)}>
            <Trash2 className="w-4 h-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <UpdateStoreDialog open={open} setOpen={setOpen} initialValue={data} />
      <DeleteDialog
        open={deleteOpen}
        setOpen={setDeleteOpen}
        title="Store"
        isLoading={isLoading}
        handleDelete={handleDelete}
      />
    </div>
  );
};
