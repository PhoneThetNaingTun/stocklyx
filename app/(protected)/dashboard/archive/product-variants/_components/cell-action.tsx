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
  useDeleteProductVariantMutation,
  useRestoreProductVariantMutation,
} from "@/store/Apis/productVariantApi";
import { ProductVariant } from "@/types/product";
import { IconDotsVertical, IconRestore, IconTrash } from "@tabler/icons-react";
import { useState } from "react";

interface Props {
  data: ProductVariant;
}

export const ArchiveProductVariantCellAction = ({ data }: Props) => {
  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [Delete, { isLoading }] = useDeleteProductVariantMutation();
  const [Restore, { isLoading: RestoreLoading }] =
    useRestoreProductVariantMutation();
  const handleDelete = async () => {
    try {
      const responseData = await Delete({ id: data.id }).unwrap();
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
      const responseData = await Restore({ id: data.id }).unwrap();
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
        title="Product Variant"
        handleRestore={handleRestore}
        isLoading={RestoreLoading}
      />
      <DeleteDialog
        open={deleteOpen}
        setOpen={setDeleteOpen}
        title="Product Variant"
        isLoading={isLoading}
        handleDelete={handleDelete}
        archive={false}
      />
    </div>
  );
};
