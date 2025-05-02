import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Status } from "../globals/types/type";
import { IData, IOrder, IOrderItems } from "../pages/checkout/type";
import { AppDispatch } from "./store";
import { APIWITHTOKEN } from "../http";



const initialState: IOrder = {
    status: Status.LOADING,
    items:[]
};

const orderSlice =createSlice({
    name: "orders",
    initialState,
    reducers: {
        setItems(state: IOrder, action: PayloadAction<IOrderItems[]>) {
            state.items =action.payload
        },
         setStatus(state: IOrder, action: PayloadAction<Status>) {
            state.status =action.payload
        }
    }
})

const { setItems,setStatus } = orderSlice.actions
export default orderSlice.reducer

export function orderItem(data:IData) {
    return async function orderItemThunk(dispatch: AppDispatch) {
        try {
            const response = await APIWITHTOKEN.post("/order",data);
            if (response.status === 200) {
                dispatch(setItems(response.data.data))
                dispatch(setStatus(Status.SUCCESS));
    
            }
            else {
                   dispatch(setStatus(Status.ERROR));
            }
          
        }  
        catch (error) {
            dispatch(setStatus(Status.ERROR))
            
        }
    }
}

