import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { ICartInitialState, ICartItem, IcartUpdateItem } from "../pages/cart/type";
import { Status } from "../globals/types/type";
import { AppDispatch } from "./store";
import { APIWITHTOKEN } from "../http";

const initialState: ICartInitialState = {
  items: [],
  status: Status.LOADING,
  
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setItems(state: ICartInitialState, action: PayloadAction<ICartItem[]>) {
      state.items = action.payload;
    },
    setStatus(state: ICartInitialState, action: PayloadAction<Status>) {
      state.status = action.payload;
    },

    setupdateCartItem(
      state: ICartInitialState,
      action: PayloadAction<IcartUpdateItem>
    ) {
      const index = state.items.findIndex(
        (item) => item.Product.id == action.payload.productId
      );
      if (index !== -1) {
        state.items[index].quantity = action.payload.quantity;
      }
    },

    setDeleteCartItem(
      state: ICartInitialState,
      action: PayloadAction<string>
    ) {
      const index = state.items.findIndex(
        (item) => item.Product.id == action.payload
        );
        if (index !== -1) {
            state.items.splice(index, 1)
        }
    },
  },
});

export const { setItems, setStatus, setupdateCartItem, setDeleteCartItem } =
  cartSlice.actions;
export default  cartSlice.reducer

export function addToCart(productId: string) {
  return async function addToCartThunk(dispatch: AppDispatch) {
    try {
      const response = await APIWITHTOKEN.post("/cart", {
        productId: productId,
        quantity: 1,
      });
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


export function fetchCartItems() {
  return async function fetchCartItemsThunk(dispatch: AppDispatch) {
    try {
      const response = await APIWITHTOKEN.get("/cart");
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

export function handleCartItemUpdate(productId: string, quantity: number) {
  return async function handleCartItemUpdateThunk(dispatch: AppDispatch) {
      try {
          const response = await APIWITHTOKEN.patch("/cart/" + productId, {
            quantity:quantity
        });
          if (response.status === 200) {
          dispatch(setStatus(Status.SUCCESS));
              dispatch(setupdateCartItem({ productId, quantity }));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR));
    }
  };
}

export function handleCartItemDelete(productId: string) {
  return async function handleCartItemUpdateThunk(dispatch: AppDispatch) {
    try {
      const response = await APIWITHTOKEN.delete("/cart/" + productId);
      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
          dispatch(setDeleteCartItem(productId));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR));
    }
  };
}


