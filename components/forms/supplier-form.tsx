import { SupplierSchema } from "@/schema/supplierSchema";
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
  form: ReturnType<typeof useForm<SupplierSchema>>;
  submitLabel: string;
  isLoading: boolean;
  handleSubmit: (value: any) => Promise<void>;
}

export const SupplierForm = ({
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
                name="supplier_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Supplier Name</FormLabel>
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
                name="supplier_email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Supplier Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value ?? ""}
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
                name="supplier_phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Supplier Phone</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value ?? ""}
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
                name="supplier_address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Supplier Address</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value ?? ""}
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
                name="supplier_city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Supplier City</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value ?? ""}
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
                name="supplier_country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Supplier Country</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value ?? ""}
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
