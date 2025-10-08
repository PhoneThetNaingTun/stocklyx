import { StoreSchema } from "@/schema/storeSchema";
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
  form: ReturnType<typeof useForm<StoreSchema>>;
  submitLabel: string;
  isLoading: boolean;
  handleSubmit: (value: any) => Promise<void>;
}

export const StoreForm = ({
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
          <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field>
              <FormField
                control={form.control}
                name="store_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Store Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="eg:Store 1"
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
                name="store_location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Store location</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="eg:1st Floor, House 1"
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
                name="store_email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Store Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="eg:example@gmail.com"
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
                name="store_phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Store Phone</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="eg:+1234567890"
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
                name="store_city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Store City</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="eg:Mandalay"
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
                name="store_country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Store Country</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="eg:Myanmar"
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </Field>
            <Field>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? <Spinner /> : <CircleFadingPlus />}
                {submitLabel}
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </Form>
    </div>
  );
};
