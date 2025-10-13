import { useGetAllBrandsQuery } from "@/store/Apis/brandApi";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setBrands } from "@/store/Slices/BrandSlice";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

export const useGetBrands = (initialPage: number, limit: number) => {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(initialPage);
  const [search, setSearch] = useState<{
    brand_name: string;
  }>({ brand_name: "" });

  const [devounceBrandName] = useDebounce(search.brand_name, 500);

  const { brands } = useAppSelector((state) => state.BrandSlice);

  const { data, isLoading } = useGetAllBrandsQuery({
    page,
    limit,
    brand_name: devounceBrandName,
  });

  useEffect(() => {
    if (data?.brands?.length) {
      dispatch(setBrands(data.brands));
    }
  }, [data, dispatch]);

  const handleNext = () => {
    if (data && page < data.totalPages) setPage(page + 1);
  };

  const handlePrevious = () => {
    if (page > 1) setPage(page - 1);
  };
  const handleSearchChange = ({ brand_name }: { brand_name: string }) => {
    setPage(1);
    setSearch({ ...search, brand_name });
  };

  return {
    brands,
    isLoading,
    totalPages: data?.totalPages ?? 1,
    handleNext,
    handlePrevious,
    handleSearchChange,
    page,
    search,
  };
};
