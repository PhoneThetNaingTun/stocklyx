"use client";
import { StoreForm } from "@/components/forms/store-form";
import { showToast } from "@/components/toaster";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { storeSchema, StoreSchema } from "@/schema/storeSchema";
import { useCreateStoreMutation } from "@/store/Apis/storeApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleFadingPlus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

export const NewStoreDialog = () => {
  const [open, setOpen] = useState<boolean>(false);

  const [CreateStore, { isLoading }] = useCreateStoreMutation();

  const storeForm = useForm<StoreSchema>({
    resolver: zodResolver(storeSchema),
    defaultValues: {
      store_name: "",
      store_location: "",
    },
    mode: "onBlur",
  });

  const handleSubmit = async (value: StoreSchema) => {
    try {
      const data = await CreateStore(value).unwrap();

      showToast({
        title: data.message,
        type: "success",
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
      <DialogTrigger asChild>
        <Button>
          <CircleFadingPlus className="w-4 h-4" /> New Store
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Store</DialogTitle>
        </DialogHeader>
        <div>
          <StoreForm
            form={storeForm}
            isLoading={isLoading}
            handleSubmit={handleSubmit}
            submitLabel="Create"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
