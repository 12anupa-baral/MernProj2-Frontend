import { Status } from "../../globals/types/type";


export interface IProduct {
  productId: string;
  productQty: number;
}

export interface IOrderItems extends IProduct {
  orderId: string;
}

export interface IOrder {
  status: Status;
  items: IOrderItems[];
  khaltiUrl: string | null;
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