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
  handleRestore: () => Promise<void>;
  setOpen: (open: boolean) => void;
  open: boolean;
}

export const RestoreDialog = ({
  title,
  isLoading,
  handleRestore,
  setOpen,
  open,
}: Props) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Are you sure you want to restore this {title}?
          </DialogTitle>
          <DialogDescription>
            Restoring this {title} will allow you to edit it.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-4 justify-between">
          <Button
            className="bg-green-500"
            disabled={isLoading}
            onClick={handleRestore}
          >
            {isLoading && <Spinner />} Restore
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
