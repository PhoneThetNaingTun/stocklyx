import { useGetUnits } from "@/hooks/useGetUnits";
import { ProductVariantSchema } from "@/schema/productVariantSchema";
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

interface Prop {
  form: ReturnType<typeof useForm<ProductVariantSchema>>;
  submitLabel: string;
  isLoading: boolean;
  handleSubmit: (value: any) => Promise<void>;
}

export const ProductVariantForm = ({
  form,
  isLoading,
  handleSubmit,
  submitLabel,
}: Prop) => {
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
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field>
              <FormField
                control={form.control}
                name={`variant_name`}
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
                name={`saleUnitId`}
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
                                    measurementUnitPage === 1 || isLoadingUnit
                                  }
                                  onClick={handlePreviousMeasurementUnit}
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
                                  onClick={handleNextMeasurementUnit}
                                  type="button"
                                >
                                  <IconArrowRight />
                                </Button>
                              </div>
                              {measurementUnits.length > 0 ? (
                                <>
                                  {measurementUnits.map((unit) => (
                                    <SelectItem key={unit.id} value={unit.id}>
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
                name={`sale_price`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sale Price *</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        placeholder="eg: 3500"
                        onChange={(e) => field.onChange(Number(e.target.value))}
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
                name={`purchase_price`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Purchase Price *</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        placeholder="eg: 3000"
                        onChange={(e) => field.onChange(Number(e.target.value))}
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
                name={`quantityPerUnit`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantity Per Unit *</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        placeholder="eg: 1 bottle = 1 quantity per unit"
                        onChange={(e) => field.onChange(Number(e.target.value))}
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
                name={`low_stock_quantity`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Low Stock Quantity</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        value={field.value ?? ""}
                        placeholder="eg: 10"
                        onChange={(e) => field.onChange(Number(e.target.value))}
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
                name={`sku`}
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
                name={`barcode`}
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
