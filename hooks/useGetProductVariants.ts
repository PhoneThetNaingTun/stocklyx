import { useGetAllProductVariantsByProductIdQuery } from "@/store/Apis/productVariantApi";
import { useAppDispatch } from "@/store/hooks";
import { useState } from "react";

export const useGetProductVariants = (
  initialPage: number,
  limit: number,
  productId: string
) => {
  const dispatch = useAppDispatch();

  const [page, setPage] = useState(initialPage);
  const [search, setSearch] = useState<{ name: string }>({ name: "" });

  const { data, isLoading } = useGetAllProductVariantsByProductIdQuery({
    page,
    limit,

    productId,
  });
  //   const { measurementUnits } = useAppSelector(
  //     (state) => state.MeasurementUnitSlice
  //   );

  //   useEffect(() => {
  //     if (data) {
  //       dispatch(setMeasurementUnits(data.measurementUnits));
  //     }
  //   }, [data, dispatch]);

  const handleNext = () => {
    if (data && page < data.totalPages) setPage(page + 1);
  };

  const handlePrevious = () => {
    if (page > 1) setPage(page - 1);
  };
  const handleSearchChange = ({ name }: { name: string }) => {
    setPage(1);
    setSearch({ name });
  };

  return {
    productVariants: data?.productVariants,
    isLoading,
    totalPages: data?.totalPages ?? 1,
    handleNext,
    handlePrevious,
    handleSearchChange,
    page,
    search,
  };
};
