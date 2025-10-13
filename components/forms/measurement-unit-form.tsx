import { useGetUnits } from "@/hooks/useGetUnits";
import { MeasurementUnitSchema } from "@/schema/measurementUnitSchema";
import { Operator } from "@/types/measurement-unit";
import { IconArrowLeft, IconArrowRight, IconX } from "@tabler/icons-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Spinner } from "../ui/spinner";
import { Textarea } from "../ui/textarea";

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
  const {
    measurementUnits,
    isLoading: isLoadingUnit,
    totalPages,
    handleNext,
    handlePrevious,
    handleSearchChange,
    page,
    search,
  } = useGetUnits(1, 10);
  return (
    <div>
      {" "}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name *</FormLabel>
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
                    <FormLabel>Unit *</FormLabel>
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
            <Field>
              <FormField
                control={form.control}
                name="baseUnitId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Base Unit</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value ?? ""}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select Unit (optional)" />
                        </SelectTrigger>

                        <SelectContent className="max-h-[200px]">
                          <div className="flex gap-1 items-center">
                            <Input
                              onChange={(e) => {
                                handleSearchChange({
                                  ...search,
                                  name: e.target.value,
                                });
                              }}
                              value={search.name}
                              placeholder="eg: Pieces"
                              className="flex-1"
                            />
                            {field.value && (
                              <Button
                                onClick={() => {
                                  field.onChange(undefined);
                                }}
                              >
                                <IconX size={20} />
                              </Button>
                            )}
                          </div>

                          {isLoadingUnit ? (
                            <SelectItem
                              disabled
                              value="-"
                              className="flex items-center justify-center"
                            >
                              <Spinner />
                            </SelectItem>
                          ) : (
                            <>
                              <div className="w-full flex items-center gap-2 justify-between">
                                <Button
                                  disabled={page === 1 || isLoadingUnit}
                                  onClick={handlePrevious}
                                  variant={"ghost"}
                                >
                                  <IconArrowLeft />
                                </Button>
                                <span>
                                  {page}/{totalPages}
                                </span>
                                <Button
                                  disabled={
                                    page === totalPages ||
                                    isLoadingUnit ||
                                    totalPages === 0
                                  }
                                  variant={"ghost"}
                                  onClick={handleNext}
                                >
                                  <IconArrowRight />
                                </Button>
                              </div>
                              {measurementUnits.length > 0 ? (
                                <>
                                  {measurementUnits.map((unit) => (
                                    <SelectItem key={unit.id} value={unit.id}>
                                      {unit.name} - {unit.unit}
                                    </SelectItem>
                                  ))}
                                </>
                              ) : (
                                <SelectItem
                                  disabled
                                  value="-"
                                  className="flex items-center justify-center"
                                >
                                  Is Empty
                                </SelectItem>
                              )}
                            </>
                          )}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </Field>
            <Field>
              <FormField
                control={form.control}
                name="operator"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Operator</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value ?? ""}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select Operator (optional)" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value={Operator.MUTIPLY}>
                            * Multiply
                          </SelectItem>
                          <SelectItem value={Operator.DIVIDE}>
                            / Divide
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </Field>
            <Field>
              <FormField
                control={form.control}
                name="operation_value"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Operation Value</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value ?? ""}
                        placeholder="eg: 5 (optional)"
                        type="number"
                        disabled={isLoading}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </Field>
          </FieldGroup>
          <FieldGroup className="mt-4">
            <Field>
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        value={field.value ?? ""}
                        placeholder="eg: Description ( 1 Box  = 5 Pieces ) (optional)"
                        disabled={isLoading}
                        className="max-h-lg"
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
