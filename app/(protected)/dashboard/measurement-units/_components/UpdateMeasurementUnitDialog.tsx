"use client";
import { MeasurementUnitForm } from "@/components/forms/measurement-unit-form";
import { showToast } from "@/components/toaster";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  measurementUnitSchema,
  MeasurementUnitSchema,
} from "@/schema/measurementUnitSchema";
import { useUpdateMeasurementUnitMutation } from "@/store/Apis/measurementUnitApi";
import { MeasurementUnit } from "@/types/measurement-unit";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useForm } from "react-hook-form";

interface Prop {
  initialValue: MeasurementUnit;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export const UpdateMeasurementUnitDialog = ({
  initialValue,
  open,
  setOpen,
}: Prop) => {
  const [Update, { isLoading }] = useUpdateMeasurementUnitMutation();

  const measurementUnitForm = useForm<MeasurementUnitSchema>({
    resolver: zodResolver(measurementUnitSchema),
    defaultValues: initialValue,
    mode: "onBlur",
  });
  useEffect(() => {
    measurementUnitForm.reset({
      ...initialValue,
    });
  }, [initialValue, measurementUnitForm]);
  const handleSubmit = async (value: MeasurementUnitSchema) => {
    try {
      const data = await Update({
        id: initialValue.id,
        ...value,
      }).unwrap();

      showToast({
        title: data.message,
        type: "success",
      });
      measurementUnitForm.reset();
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
          <DialogTitle>Update Measurement Unit</DialogTitle>
          <DialogDescription>Edit the unit here.</DialogDescription>
        </DialogHeader>
        <div>
          <MeasurementUnitForm
            form={measurementUnitForm}
            isLoading={isLoading}
            handleSubmit={handleSubmit}
            submitLabel="Update"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
