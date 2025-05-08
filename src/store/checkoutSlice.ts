import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Status } from "../globals/types/type";
import { IData, IOrder, IOrderItems } from "../pages/checkout/type";
import { AppDispatch } from "./store";
import { APIWITHTOKEN } from "../http";
import { IOrderDetail, OrderStatus } from "../pages/orderdetails/types";

const initialState: IOrder = {
  status: Status.LOADING,
  items: [],
  khaltiUrl: null,
  orderDetails: [],
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setItems(state: IOrder, action: PayloadAction<IOrderItems[]>) {
      state.items = action.payload;
    },
    setStatus(state: IOrder, action: PayloadAction<Status>) {
      state.status = action.payload;
    },

    setKhaltiUrl(state: IOrder, action: PayloadAction<string>) {
      state.khaltiUrl = action.payload;
    },

    setOrderDetails(state: IOrder, action: PayloadAction<IOrderDetail[]>) {
      state.orderDetails = action.payload;
    },

    updateOrderStatus(
      state: IOrder,
      action: PayloadAction<{ orderId: string }>
    ) {
      const orderId = action.payload.orderId;
      const data = state.orderDetails.find((order) => order.id === orderId);
      data ? (data.Order.orderStatus = OrderStatus.Cancelled) : "";
    },
  },
});

const {
  setItems,
  setStatus,
  setKhaltiUrl,
  setOrderDetails,
  updateOrderStatus,
} = orderSlice.actions;
export default orderSlice.reducer;

export function orderItem(data: IData) {
  return async function orderItemThunk(dispatch: AppDispatch) {
    try {
      const response = await APIWITHTOKEN.post("/order", data);
      if (response.status === 200) {
        dispatch(setItems(response.data.data));
        dispatch(setStatus(Status.SUCCESS));

        if (response.data.url) {
          setKhaltiUrl(response.data.url);
          window.location.href = response.data.url;
        }

        return { success: true, status: 200 };
      } else {
        dispatch(setStatus(Status.ERROR));
        return { success: false, status: response.status };
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR));
      return { success: false, error };
    }
  };
}

export function fetchMyOrders() {
  return async function fetchMyOrdersThunk(dispatch: AppDispatch) {
    try {
      const response = await APIWITHTOKEN.get("/order");
      if (response.status === 200) {
        dispatch(setItems(response.data.data));
        dispatch(setStatus(Status.SUCCESS));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR));
    }
  };
}

export function fetchMyOrder(orderId: string) {
  return async function fetchMyOrderThunk(dispatch: AppDispatch) {
    try {
      const response = await APIWITHTOKEN.get("/order/" + orderId);
      if (response.status === 200) {
        dispatch(setOrderDetails(response.data.data));
        dispatch(setStatus(Status.SUCCESS));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR));
    }
  };
}

export function cancelMyOrder(orderId: string) {
  return async function cancelMyOrderThunk(dispatch: AppDispatch) {
    try {
      const response = await APIWITHTOKEN.patch(
        "/order/cancel-order/" + orderId
      );
      if (response.status === 200) {
        dispatch(updateOrderStatus(response.data.data));
        dispatch(setStatus(Status.SUCCESS));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR));
    }
  };
}

