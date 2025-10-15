import { useGetUnits } from "@/hooks/useGetUnits";
import { ProductVariantMultipleSchema } from "@/schema/productVariantMultipleSchema";
import {
  IconArrowLeft,
  IconArrowRight,
  IconInfoCircle,
  IconPlus,
  IconQuestionMark,
  IconTrash,
  IconX,
} from "@tabler/icons-react";
import { CircleFadingPlus } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
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
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Spinner } from "../ui/spinner";

interface Prop {
  form: ReturnType<typeof useForm<ProductVariantMultipleSchema>>;
  submitLabel: string;
  isLoading: boolean;
  handleSubmit: (value: any) => Promise<void>;
}

export const ProductVariantMultipleForm = ({
  form,
  isLoading,
  handleSubmit,
  submitLabel,
}: Prop) => {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "variants",
  });

  const {
    measurementUnits,
    isLoading: isLoadingUnit,
    totalPages: measurementUnitTotalPages,
    handleNext: handleNextMeasurementUnit,
    handlePrevious: handlePreviousMeasurementUnit,
    handleSearchChange: handleSearchChangeMeasurementUnit,
    page: measurementUnitPage,
    search: measurementUnitSearch,
  } = useGetUnits(1, 10);

  return (
    <div className="relative">
      <div className="flex items-center gap-1">
        <Button
          onClick={() =>
            append({
              variant_name: "",
              saleUnitId: "",
              quantityPerUnit: 0,
              sale_price: 0,
              purchase_price: 0,
              sku: "",
              barcode: "",
            })
          }
          variant={"outline"}
          type="button"
          className="flex-1 my-2"
        >
          <IconPlus /> Add Variant Card
        </Button>
        <Popover>
          <PopoverTrigger asChild>
            <Badge variant={"outline"} className="py-2">
              <IconQuestionMark size={30} />
            </Badge>
          </PopoverTrigger>
          <PopoverContent className="max-w-64 py-3 text-pretty">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <IconInfoCircle className="size-4" />
                <p className="text-sm font-medium">Multiple Variants</p>
              </div>
              <p className="text-sm text-muted-foreground">
                This button allow you to add and create multiple variant cards
                at once!
              </p>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="max-h-[50vh] overflow-y-scroll no-scrollbar p-2 bg-gray-200 rounded-sm space-y-2">
            {fields.length > 0 ? (
              fields.map((field, index) => {
                return (
                  <Card key={field.id}>
                    <CardHeader className="flex items-center justify-between">
                      <CardTitle>Variant {index + 1}</CardTitle>
                      <Button
                        onClick={() => remove(index)}
                        variant={"destructive"}
                        className="w-fit"
                        type="button"
                      >
                        <IconTrash />
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Field>
                          <FormField
                            control={form.control}
                            name={`variants.${index}.variant_name`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Variant Name *</FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    placeholder="eg: A bottle of coke"
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
                            name={`variants.${index}.saleUnitId`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Sale Unit *</FormLabel>
                                <FormControl>
                                  <Select
                                    onValueChange={field.onChange}
                                    value={field.value ?? ""}
                                  >
                                    <SelectTrigger className="w-full">
                                      <SelectValue placeholder="Select Unit " />
                                    </SelectTrigger>

                                    <SelectContent className="max-h-[200px]">
                                      <div className="flex gap-1 items-center">
                                        <Input
                                          onChange={(e) => {
                                            handleSearchChangeMeasurementUnit({
                                              ...measurementUnitSearch,
                                              name: e.target.value,
                                            });
                                          }}
                                          value={measurementUnitSearch.name}
                                          placeholder="eg: Pieces"
                                          className="flex-1"
                                        />
                                        {field.value && (
                                          <Button
                                            onClick={() => {
                                              field.onChange(undefined);
                                            }}
                                            type="button"
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
                                              disabled={
                                                measurementUnitPage === 1 ||
                                                isLoadingUnit
                                              }
                                              onClick={
                                                handlePreviousMeasurementUnit
                                              }
                                              variant={"ghost"}
                                              type="button"
                                            >
                                              <IconArrowLeft />
                                            </Button>
                                            <span>
                                              {measurementUnitPage}/
                                              {measurementUnitTotalPages}
                                            </span>
                                            <Button
                                              disabled={
                                                measurementUnitPage ===
                                                  measurementUnitTotalPages ||
                                                isLoadingUnit ||
                                                measurementUnitTotalPages === 0
                                              }
                                              variant={"ghost"}
                                              onClick={
                                                handleNextMeasurementUnit
                                              }
                                              type="button"
                                            >
                                              <IconArrowRight />
                                            </Button>
                                          </div>
                                          {measurementUnits.length > 0 ? (
                                            <>
                                              {measurementUnits.map((unit) => (
                                                <SelectItem
                                                  key={unit.id}
                                                  value={unit.id}
                                                >
                                                  {unit.name} - {unit.unit}{" "}
                                                  {unit.description &&
                                                    `(${unit.description})`}
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
                            name={`variants.${index}.sale_price`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Sale Price *</FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    type="number"
                                    placeholder="eg: 3500"
                                    onChange={(e) =>
                                      field.onChange(Number(e.target.value))
                                    }
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
                            name={`variants.${index}.purchase_price`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Purchase Price *</FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    type="number"
                                    placeholder="eg: 3000"
                                    onChange={(e) =>
                                      field.onChange(Number(e.target.value))
                                    }
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
                            name={`variants.${index}.quantityPerUnit`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Quantity Per Unit *</FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    type="number"
                                    placeholder="eg: 1 bottle = 1 quantity per unit"
                                    onChange={(e) =>
                                      field.onChange(Number(e.target.value))
                                    }
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
                            name={`variants.${index}.low_stock_quantity`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Low Stock Quantity</FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    type="number"
                                    value={field.value ?? ""}
                                    placeholder="eg: 10"
                                    onChange={(e) =>
                                      field.onChange(Number(e.target.value))
                                    }
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
                            name={`variants.${index}.sku`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Sku </FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    value={field.value ?? ""}
                                    placeholder="eg: COCA-Bot"
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
                            name={`variants.${index}.barcode`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Barcode</FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    value={field.value ?? ""}
                                    placeholder="eg: Barcode---"
                                    disabled={isLoading}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </Field>
                      </FieldGroup>
                    </CardContent>
                  </Card>
                );
              })
            ) : (
              <div className="flex items-center justify-center">
                <p className="text-red-500">No Variants!</p>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3 mt-3">
            <Button type="submit" disabled={isLoading} className=" flex-1">
              {isLoading ? <Spinner /> : <CircleFadingPlus />}
              {submitLabel}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
