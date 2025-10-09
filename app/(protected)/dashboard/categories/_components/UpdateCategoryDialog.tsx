"use client";
import { CategroyForm } from "@/components/forms/category-form";
import { showToast } from "@/components/toaster";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { categorySchema, CategorySchema } from "@/schema/categorySchema";
import { StoreSchema } from "@/schema/storeSchema";
import { useUpdateCategoryMutation } from "@/store/Apis/categoryApi";
import { Category } from "@/types/category";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useForm } from "react-hook-form";

interface Prop {
  initialValue: Category;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export const UpdateCategoryDialog = ({ initialValue, open, setOpen }: Prop) => {
  const [updateCategory, { isLoading }] = useUpdateCategoryMutation();

  const categoryForm = useForm<CategorySchema>({
    resolver: zodResolver(categorySchema),
    defaultValues: initialValue,
    mode: "onBlur",
  });
  useEffect(() => {
    categoryForm.reset({
      ...initialValue,
    });
  }, [initialValue, categoryForm]);
  const handleSubmit = async (value: StoreSchema) => {
    try {
      const data = await updateCategory({
        id: initialValue.id,
        ...value,
      }).unwrap();

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
          title: "Something went wrong!",
          type: "error",
        });
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-h-screen overflow-y-scroll no-scrollbar">
        <DialogHeader>
          <DialogTitle>Update Category</DialogTitle>
          <DialogDescription>Edit the category here.</DialogDescription>
        </DialogHeader>
        <div>
          <CategroyForm
            form={categoryForm}
            isLoading={isLoading}
            handleSubmit={handleSubmit}
            submitLabel="Update"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
