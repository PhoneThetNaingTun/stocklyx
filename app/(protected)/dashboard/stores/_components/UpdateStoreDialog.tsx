"use client";
import { StoreForm } from "@/components/forms/store-form";
import { showToast } from "@/components/toaster";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { storeSchema, StoreSchema } from "@/schema/storeSchema";
import { useUpdateStoreMutation } from "@/store/Apis/storeApi";
import { Store } from "@/types/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useForm } from "react-hook-form";

interface Prop {
  initialValue: Store;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export const UpdateStoreDialog = ({ initialValue, open, setOpen }: Prop) => {
  const [UpdateStore, { isLoading }] = useUpdateStoreMutation();

  const storeForm = useForm<StoreSchema>({
    resolver: zodResolver(storeSchema),
    defaultValues: initialValue,
    mode: "onBlur",
  });
  useEffect(() => {
    storeForm.reset({
      ...initialValue,
    });
  }, [initialValue, storeForm]);
  const handleSubmit = async (value: StoreSchema) => {
    try {
      const data = await UpdateStore({
        id: initialValue.id,
        ...value,
      }).unwrap();

      showToast({
        title: data.message,
        type: "success",
        description: `Location: ${data.data.store_location}`,
      });
      storeForm.reset();
      setOpen(false);
    } catch (error: any) {
      if (error?.data?.message) {
        showToast({
          title: error.data.message[0],
          type: "error",
        });
      } else {
        showToast({
          title: "An unexpected error occurred",
          type: "error",
        });
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-h-screen overflow-y-scroll no-scrollbar">
        <DialogHeader>
          <DialogTitle>Update Store</DialogTitle>
          <DialogDescription>Edit the store here.</DialogDescription>
        </DialogHeader>
        <div>
          <StoreForm
            form={storeForm}
            isLoading={isLoading}
            handleSubmit={handleSubmit}
            submitLabel="Update"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
