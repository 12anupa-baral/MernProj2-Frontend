import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Status } from "../globals/types/type";
import { AppDispatch } from "./store";
import { APIWITHTOKEN } from "../http";
// import { ICategoryData } from "../pages/admin/categories/Categories";

interface CategoryData {
  id: string;
  categoryName: string;
  createdAt: Date;
  updatedAt: Date;
}
interface IcategoryInitialState {
  items: CategoryData[];
  status: Status;
}

const initialState: IcategoryInitialState = {
  items: [],
  status: Status.LOADING,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setItems(
      state: IcategoryInitialState,
      action: PayloadAction<CategoryData[]>
    ) {
      state.items = action.payload;
    },
    setStatus(state: IcategoryInitialState, action: PayloadAction<Status>) {
      state.status = action.payload;
    },

    addCategoryToItems(
      state: IcategoryInitialState,
      action: PayloadAction<CategoryData>
    ) {
      state.items.push(action.payload);
    },

    setDeleteCategoryItem(
      state: IcategoryInitialState,
      action: PayloadAction<string>
    ) {
      const index = state.items.findIndex((item) => item.id == action.payload);
      if (index !== -1) {
        state.items.splice(index, 1);
      }
    },

    resetStatus(status: IcategoryInitialState) {
      status.status = Status.LOADING;
    },
  },
});

export const {
  setItems,
  setStatus,
  setDeleteCategoryItem,
  addCategoryToItems,
  resetStatus,
} = categorySlice.actions;
export default categorySlice.reducer;

export function addCategory(categoryName: string) {
  return async function addCategoryThunk(dispatch: AppDispatch) {
    try {
      const response = await APIWITHTOKEN.post("/category", {
        categoryName: categoryName,
      });
      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
        dispatch(addCategoryToItems(response.data.data));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR));
    }
  };
}

export function fetchCategory() {
  return async function fetchCategoryThunk(dispatch: AppDispatch) {
    try {
      const response = await APIWITHTOKEN.get("/category");
      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
        dispatch(setItems(response.data.data));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR));
    }
  };
}

export function handleCategoryDelete(categoryId: string) {
  return async function handleCategoryDeleteThunk(dispatch: AppDispatch) {
    try {
      const response = await APIWITHTOKEN.delete("/category/" + categoryId);
      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
        dispatch(setDeleteCategoryItem(categoryId));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR));
    }
  };
}
