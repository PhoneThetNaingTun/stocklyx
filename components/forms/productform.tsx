import { useGetBrands } from "@/hooks/useGetBrands";
import { useGetCategories } from "@/hooks/useGetCategory";
import { useGetUnits } from "@/hooks/useGetUnits";
import { ProductSchema } from "@/schema/productSchema";
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
  form: ReturnType<typeof useForm<ProductSchema>>;
  submitLabel: string;
  isLoading: boolean;
  handleSubmit: (value: any) => Promise<void>;
}

export const ProductForm = ({
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
  const {
    brands,
    isLoading: isLoadingBrands,
    totalPages: brandsTotalPages,
    handleNext: handleNextBrand,
    handlePrevious: handlePreviousBrand,
    handleSearchChange: handleSearchChangeBrand,
    page: brandsPage,
    search: brandsSearch,
  } = useGetBrands(1, 10);

  const {
    categories,
    isLoading: isLoadingCategories,
    totalPages: categoriesTotalPages,
    handleNext: handleNextCategory,
    handlePrevious: handlePreviousCategory,
    handleSearchChange: handleSearchChangeCategory,
    page: categoriesPage,
    search: categoriesSearch,
  } = useGetCategories(1, 10);

  return (
    <div>
      {" "}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field>
              <FormField
                control={form.control}
                name="product_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name *</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="eg:Coca Cola"
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
                    <FormLabel>Base Unit *</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value ?? ""}
                        disabled={isLoading}
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
            {/* Brand */}
            <Field>
              <FormField
                control={form.control}
                name="brandId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Brand *</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value ?? ""}
                        disabled={isLoading}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select Brand " />
                        </SelectTrigger>

                        <SelectContent className="max-h-[200px]">
                          <div className="flex gap-1 items-center">
                            <Input
                              onChange={(e) => {
                                handleSearchChangeBrand({
                                  ...brandsSearch,
                                  brand_name: e.target.value,
                                });
                              }}
                              value={brandsSearch.brand_name}
                              placeholder="eg: Brand 1"
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

                          {isLoadingBrands ? (
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
                                  disabled={brandsPage === 1 || isLoadingBrands}
                                  onClick={handlePreviousBrand}
                                  variant={"ghost"}
                                  type="button"
                                >
                                  <IconArrowLeft />
                                </Button>
                                <span>
                                  {brandsPage}/{brandsTotalPages}
                                </span>
                                <Button
                                  disabled={
                                    brandsPage === brandsTotalPages ||
                                    isLoadingBrands ||
                                    brandsTotalPages === 0
                                  }
                                  variant={"ghost"}
                                  onClick={handleNextBrand}
                                  type="button"
                                >
                                  <IconArrowRight />
                                </Button>
                              </div>
                              {brands.length > 0 ? (
                                <>
                                  {brands.map((brand) => (
                                    <SelectItem key={brand.id} value={brand.id}>
                                      {brand.brand_name}
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

            {/* Category */}
            <Field>
              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category *</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value ?? ""}
                        disabled={isLoading}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select Category" />
                        </SelectTrigger>

                        <SelectContent className="max-h-[200px]">
                          <div className="flex gap-1 items-center">
                            <Input
                              onChange={(e) => {
                                handleSearchChangeCategory({
                                  ...categoriesSearch,
                                  category_name: e.target.value,
                                });
                              }}
                              value={categoriesSearch.category_name}
                              placeholder="eg: Drink"
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

                          {isLoadingCategories ? (
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
                                    categoriesPage === 1 || isLoadingCategories
                                  }
                                  onClick={handlePreviousCategory}
                                  variant={"ghost"}
                                  type="button"
                                >
                                  <IconArrowLeft />
                                </Button>
                                <span>
                                  {categoriesPage}/{categoriesTotalPages}
                                </span>
                                <Button
                                  disabled={
                                    categoriesPage === categoriesTotalPages ||
                                    isLoadingCategories ||
                                    categoriesTotalPages === 0
                                  }
                                  variant={"ghost"}
                                  onClick={handleNextCategory}
                                  type="button"
                                >
                                  <IconArrowRight />
                                </Button>
                              </div>
                              {categories.length > 0 ? (
                                <>
                                  {categories.map((category) => (
                                    <SelectItem
                                      key={category.id}
                                      value={category.id}
                                    >
                                      {category.category_name}
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
                        placeholder="eg: Description"
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
