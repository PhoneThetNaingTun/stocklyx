import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Spinner } from "./ui/spinner";

interface Props {
  title: string;
  isLoading: boolean;
  handleDelete: () => Promise<void>;
  setOpen: (open: boolean) => void;
  open: boolean;
}

export const DeleteDialog = ({
  title,
  isLoading,
  handleDelete,
  setOpen,
  open,
}: Props) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Are you sure you want to delete this {title}?
          </DialogTitle>
          <DialogDescription className="text-red-500">
            This action cannot be undone! This will delete all the data
            associate with this {title}!
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-4 justify-between">
          <Button
            variant={"destructive"}
            disabled={isLoading}
            onClick={handleDelete}
          >
            {isLoading && <Spinner />} Delete
          </Button>
          <DialogClose asChild>
            <Button variant={"outline"} disabled={isLoading}>
              Cancel
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};
