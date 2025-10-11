"use client";
import { CustomerForm } from "@/components/forms/customer-form";
import { showToast } from "@/components/toaster";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { customerSchema, CustomerSchema } from "@/schema/customerSchema";
import { useUpdateCustomerMutation } from "@/store/Apis/customerApi";
import { Customer } from "@/types/customer";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useForm } from "react-hook-form";

interface Prop {
  initialValue: Customer;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export const UpdateCustomerDialog = ({ initialValue, open, setOpen }: Prop) => {
  const [UpdateCustomer, { isLoading }] = useUpdateCustomerMutation();

  const customerForm = useForm<CustomerSchema>({
    resolver: zodResolver(customerSchema),
    defaultValues: initialValue,
    mode: "onBlur",
  });
  useEffect(() => {
    customerForm.reset({
      ...initialValue,
    });
  }, [initialValue, customerForm]);
  const handleSubmit = async (value: CustomerSchema) => {
    try {
      const data = await UpdateCustomer({
        id: initialValue.id,
        ...value,
      }).unwrap();

      showToast({
        title: data.message,
        type: "success",
      });
      customerForm.reset();
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
          <DialogTitle>Update Customer</DialogTitle>
          <DialogDescription>Edit the customer here.</DialogDescription>
        </DialogHeader>
        <div>
          <CustomerForm
            form={customerForm}
            isLoading={isLoading}
            handleSubmit={handleSubmit}
            submitLabel="Update"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
