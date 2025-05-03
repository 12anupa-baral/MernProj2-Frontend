import { paymentMethod } from "../checkout/type";

export interface IProduct {
  categoryId: string;
  createdAt: string;
  discount: number;
  id: string;
  productDescription: string;
  productImageUrl: string;
  productName: string;
  productPrice: number;
  productStock: number | null;
  updatedAt: string;
}


export interface Ipayment {
  paymenStatus: string;
  paymentMethod: paymentMethod;
}


export interface IOrderDetail {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  Product: IProduct;
  Order: IOrderProduct;
    
}

export interface IOrderProduct {
  id: string;
  payment: Ipayment;
  addressLine: string;
  city: string;
  email: string;
  firstName: string;
  lastName: string;
  orderStatus: string;
  paymentId: string | null;
  phoneNumber: string;
  state: string;
  totalAmount: number;
  updatedAt: string;
  userId: string;
  zipcode: string;
}


