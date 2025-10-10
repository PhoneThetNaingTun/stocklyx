"use client";
import { CustomerForm } from "@/components/forms/customer-form";
import { showToast } from "@/components/toaster";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { customerSchema, CustomerSchema } from "@/schema/customerSchema";
import { StoreSchema } from "@/schema/storeSchema";
import { useCreateCustomerMutation } from "@/store/Apis/customerApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconPlus } from "@tabler/icons-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

export const NewCustomerDialog = () => {
  const [open, setOpen] = useState<boolean>(false);

  const [CreateCustomer, { isLoading }] = useCreateCustomerMutation();

  const customerForm = useForm<CustomerSchema>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      customer_name: "",
      customer_email: "",
      customer_phone: "",
      customer_address: "",
      customer_city: "",
      customer_country: "",
    },
    mode: "onBlur",
  });

  const handleSubmit = async (value: StoreSchema) => {
    try {
      const data = await CreateCustomer(value).unwrap();

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
      <DialogTrigger asChild>
        <Button>
          <IconPlus className="w-4 h-4" /> New Customer
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-screen overflow-y-scroll no-scrollbar">
        <DialogHeader>
          <DialogTitle>New Customer</DialogTitle>
        </DialogHeader>
        <div>
          <CustomerForm
            form={customerForm}
            isLoading={isLoading}
            handleSubmit={handleSubmit}
            submitLabel="Create"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
