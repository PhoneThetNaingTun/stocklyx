import { CustomerSchema } from "@/schema/customerSchema";
import { CircleFadingPlus } from "lucide-react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Field, FieldGroup } from "../ui/field";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Spinner } from "../ui/spinner";

interface Prop {
  form: ReturnType<typeof useForm<CustomerSchema>>;
  submitLabel: string;
  isLoading: boolean;
  handleSubmit: (value: any) => Promise<void>;
}

export const CustomerForm = ({
  form,
  isLoading,
  handleSubmit,
  submitLabel,
}: Prop) => {
  return (
    <div>
      {" "}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Field>
              <FormField
                control={form.control}
                name="customer_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Customer Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="eg: John Doe"
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </Field>
            <Field>
              <FormField
                control={form.control}
                name="customer_email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Customer Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="eg: VXN5o@example.com (optional)"
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </Field>

            <Field>
              <FormField
                control={form.control}
                name="customer_phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Customer Phone</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="eg: 1234567890 (optional)"
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </Field>
            <Field>
              <FormField
                control={form.control}
                name="customer_address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Customer Address</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="eg: 123 Main St, Anytown, USA (optional)"
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </Field>
            <Field>
              <FormField
                control={form.control}
                name="customer_city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Customer City</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="eg: New York (optional)"
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </Field>
            <Field>
              <FormField
                control={form.control}
                name="customer_country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Customer Country</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="eg: USA (optional)"
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </Field>
          </FieldGroup>
          <Button type="submit" disabled={isLoading} className="mt-2 w-full">
            {isLoading ? <Spinner /> : <CircleFadingPlus />}
            {submitLabel}
          </Button>
        </form>
      </Form>
    </div>
  );
};
