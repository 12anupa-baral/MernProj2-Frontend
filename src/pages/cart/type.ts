import { Status } from "../../globals/types/type";
import { IProduct } from "../product/types";

export interface IcartProductItem {
  id: string;
  productName: string;
  productImageUrl: string;
  productPrice: number;
}

export interface ICartItem {
    id:string,
    productId: string ,
    quantity: number,
    Product:IcartProductItem
}

export interface ICartInitialState {
    items: ICartItem[] ;
    status:Status
}

export interface IcartUpdateItem {
  productId: string;
  quantity: number;
}
