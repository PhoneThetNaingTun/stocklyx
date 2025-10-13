import { useGetAllMeasurementUnitsQuery } from "@/store/Apis/measurementUnitApi";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setMeasurementUnits } from "@/store/Slices/MeasurementUnitSlice";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

export const useGetUnits = (initialPage: number, limit: number) => {
  const dispatch = useAppDispatch();

  const [page, setPage] = useState(initialPage);
  const [search, setSearch] = useState<{ name: string }>({ name: "" });

  const [devounceName] = useDebounce(search.name, 500);
  const { data, isLoading } = useGetAllMeasurementUnitsQuery({
    page,
    limit,
    name: devounceName,
  });
  const { measurementUnits } = useAppSelector(
    (state) => state.MeasurementUnitSlice
  );

  useEffect(() => {
    if (data) {
      dispatch(setMeasurementUnits(data.measurementUnits));
    }
  }, [data, dispatch]);

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
    measurementUnits,
    isLoading,
    totalPages: data?.totalPages ?? 1,
    handleNext,
    handlePrevious,
    handleSearchChange,
    page,
    search,
  };
};
