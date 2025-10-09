"use client";
import { CategroyForm } from "@/components/forms/category-form";
import { showToast } from "@/components/toaster";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { categorySchema, CategorySchema } from "@/schema/categorySchema";
import { useCreateCategoryMutation } from "@/store/Apis/categoryApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconPlus } from "@tabler/icons-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

export const NewCategoryDialog = () => {
  const [open, setOpen] = useState<boolean>(false);

  const [CreateCategory, { isLoading }] = useCreateCategoryMutation();

  const categoryForm = useForm<CategorySchema>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      category_name: "",
    },
    mode: "onBlur",
  });

  const handleSubmit = async (value: CategorySchema) => {
    try {
      const data = await CreateCategory(value).unwrap();

      showToast({
        title: data.message,
        type: "success",
      });
      categoryForm.reset();
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
          <IconPlus className="w-4 h-4" /> New Category
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-screen overflow-y-scroll no-scrollbar">
        <DialogHeader>
          <DialogTitle>New Category</DialogTitle>
        </DialogHeader>
        <div>
          <CategroyForm
            form={categoryForm}
            isLoading={isLoading}
            handleSubmit={handleSubmit}
            submitLabel="Create"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
