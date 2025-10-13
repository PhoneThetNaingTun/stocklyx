import { Category } from "@/types/category";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CategoryState {
  categories: Category[];
}

const initialState: CategoryState = {
  categories: [],
};

const CategorySlice = createSlice({
  name: "CategorySlice",
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<Category[]>) => {
      state.categories = action.payload;
    },
  },
});

export const { setCategories } = CategorySlice.actions;
export default CategorySlice.reducer;
