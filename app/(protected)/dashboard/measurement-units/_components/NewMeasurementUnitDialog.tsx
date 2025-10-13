"use client";
import { MeasurementUnitForm } from "@/components/forms/measurement-unit-form";
import { showToast } from "@/components/toaster";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  measurementUnitSchema,
  MeasurementUnitSchema,
} from "@/schema/measurementUnitSchema";
import { useCreateMeasurementUnitMutation } from "@/store/Apis/measurementUnitApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconPlus } from "@tabler/icons-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

export const NewMeasurementUnitDialog = () => {
  const [open, setOpen] = useState<boolean>(false);

  const [create, { isLoading }] = useCreateMeasurementUnitMutation();

  const measurementUnitForm = useForm<MeasurementUnitSchema>({
    resolver: zodResolver(measurementUnitSchema),
    defaultValues: {
      unit: "",
      name: "",
      baseUnitId: "",
      operator: undefined,
      description: "",
      operation_value: undefined,
    },
    mode: "onBlur",
  });

  const handleSubmit = async (value: MeasurementUnitSchema) => {
    try {
      const data = await create(value).unwrap();

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
      <DialogTrigger asChild>
        <Button>
          <IconPlus className="w-4 h-4" /> New Measurement Unit
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-screen overflow-y-scroll no-scrollbar">
        <DialogHeader>
          <DialogTitle>New Measurement Unit</DialogTitle>
        </DialogHeader>
        <div>
          <MeasurementUnitForm
            form={measurementUnitForm}
            isLoading={isLoading}
            handleSubmit={handleSubmit}
            submitLabel="Create"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
