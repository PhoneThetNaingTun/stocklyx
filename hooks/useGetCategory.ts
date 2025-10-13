import { useGetAllCategoriesQuery } from "@/store/Apis/categoryApi";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setCategories } from "@/store/Slices/CategorySlice";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

export const useGetCategories = (initialPage: number, limit: number) => {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(initialPage);
  const [search, setSearch] = useState<{
    category_name: string;
  }>({ category_name: "" });

  const [devounceCategoryName] = useDebounce(search.category_name, 500);

  const { categories } = useAppSelector((state) => state.CategorySlice);

  const { data, isLoading } = useGetAllCategoriesQuery({
    page,
    limit,
    category_name: devounceCategoryName,
  });

  useEffect(() => {
    if (data?.categories?.length) {
      dispatch(setCategories(data.categories));
    }
  }, [data, dispatch]);

  const handleNext = () => {
    if (data && page < data.totalPages) setPage(page + 1);
  };

  const handlePrevious = () => {
    if (page > 1) setPage(page - 1);
  };
  const handleSearchChange = ({ category_name }: { category_name: string }) => {
    setPage(1);
    setSearch({ ...search, category_name });
  };

  return {
    categories,
    isLoading,
    totalPages: data?.totalPages ?? 1,
    handleNext,
    handlePrevious,
    handleSearchChange,
    page,
    search,
  };
};
