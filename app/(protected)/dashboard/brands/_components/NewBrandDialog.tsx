"use client";
import { BrandForm } from "@/components/forms/brand-form";
import { showToast } from "@/components/toaster";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { brandSchema, BrandSchema } from "@/schema/brandSchema";
import { CategorySchema } from "@/schema/categorySchema";
import { useCreateBrandMutation } from "@/store/Apis/brandApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconPlus } from "@tabler/icons-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

export const NewBrandDialog = () => {
  const [open, setOpen] = useState<boolean>(false);

  const [createBrand, { isLoading }] = useCreateBrandMutation();

  const brandForm = useForm<BrandSchema>({
    resolver: zodResolver(brandSchema),
    defaultValues: {
      brand_name: "",
    },
    mode: "onBlur",
  });

  const handleSubmit = async (value: CategorySchema) => {
    try {
      const data = await createBrand(value).unwrap();

      showToast({
        title: data.message,
        type: "success",
      });
      brandForm.reset();
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
          <IconPlus className="w-4 h-4" /> New Brand
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-screen overflow-y-scroll no-scrollbar">
        <DialogHeader>
          <DialogTitle>New Brand</DialogTitle>
        </DialogHeader>
        <div>
          <BrandForm
            form={brandForm}
            isLoading={isLoading}
            handleSubmit={handleSubmit}
            submitLabel="Create"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
