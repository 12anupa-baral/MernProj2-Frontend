import { Status } from "../../globals/types/type";
import { IOrderDetail } from "../orderdetails/types";

export interface IProduct {
  productId: string;
  productQty: number;
  orderStatus?: string;
  totalAmount?: number;
  Payment?: {
    paymentMethod: string;
    paymentStatus: string;
  };
}

export interface IOrderItems extends IProduct {
  id: string;
}

export interface IOrder {
  status: Status;
  items: IOrderItems[];
  khaltiUrl: string | null;
  orderDetails: IOrderDetail[];
}
export enum paymentMethod {
  Esewa = "esewa",
  Khalti = "khalti",
  cod = "cod",
}

export interface IData {
  firstName: string,
  lastName: string,
  email: string,
addressLine: string,
  city: string,
  state: string,
  zipcode: string,
  phoneNumber: number,
  totalAmount: number,
  paymentMethod: paymentMethod;
 products: IProduct[];
}