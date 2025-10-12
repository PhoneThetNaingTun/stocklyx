import { MeasurementUnitSchema } from "@/schema/measurementUnitSchema";
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
  form: ReturnType<typeof useForm<MeasurementUnitSchema>>;
  submitLabel: string;
  isLoading: boolean;
  handleSubmit: (value: any) => Promise<void>;
}

export const MeasurementUnitForm = ({
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
          <FieldGroup>
            <Field>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="eg:Pieces"
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
                name="unit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Unit</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="eg:Pcs"
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
