import { DeleteDialog } from "@/components/delete-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
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

  const handleDelete = async () => {};

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
        isLoading={false}
        handleDelete={handleDelete}
      />
    </div>
  );
};
