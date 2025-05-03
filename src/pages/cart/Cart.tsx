import { Link } from "react-router-dom";
import {
  handleCartItemDelete,
  handleCartItemUpdate,
} from "../../store/cartSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { toast } from "react-toastify";

const Cart = () => {
  const items = useAppSelector((store) => store.cart.items);
  const dispatch = useAppDispatch();
  const handleUpdate = (productId: string, quantity: number) => {
    dispatch(handleCartItemUpdate(productId, quantity));
    toast.success("Quantity updated successfully!");
  };

  const handleDeleteCart = (productId: string) => {
    dispatch(handleCartItemDelete(productId));
    toast.success("Product removed from cart.");
  };

  const subTotal = items.reduce(
    (total, item) => total + item.Product.productPrice * item.quantity,
    0
  );

  const totalQuantity = items.reduce((total, item) => total + item.quantity, 0);

  const shippingPrice = 100;
  const total = subTotal + shippingPrice;

  return (
    <>
      <section>
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="md:w-3/4">
              <div className="bg-white rounded-lg shadow-md p-6 mb-4">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="text-left font-semibold">Product</th>
                      <th className="text-left font-semibold">Price</th>
                      <th className="text-left font-semibold">Quantity</th>
                      <th className="text-left font-semibold">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.length > 0 ? (
                      items.map((item, id) => {
                        return (
                          <tr key={id}>
                            <td className="py-4">
                              <div className="flex items-center">
                                <img
                                  className="h-16 w-16 mr-4"
                                  src={`http://localhost:3001/uploads/${item?.Product?.productImageUrl}`}
                                  alt="Product image"
                                />
                                <span className="font-semibold">
                                  {item?.Product?.productName}
                                </span>
                              </div>
                            </td>
                            <td className="py-4">
                              {item?.Product?.productPrice}
                            </td>
                            <td className="py-4">
                              <div className="flex items-center">
                                <button
                                  className="border rounded-md py-2 px-4 mr-2"
                                  onClick={() => {
                                    handleUpdate(
                                      item.Product.id,
                                      item.quantity - 1
                                    );
                                  }}
                                >
                                  -
                                </button>
                                <span className="text-center w-8">
                                  {item?.quantity}
                                </span>
                                <button
                                  className="border rounded-md py-2 px-4 ml-2"
                                  onClick={() => {
                                    handleUpdate(
                                      item.Product.id,
                                      item.quantity + 1
                                    );
                                  }}
                                >
                                  +
                                </button>
                              </div>
                            </td>
                            <td className="py-4">
                              {item?.Product?.productPrice * item?.quantity}
                            </td>

                            <td className="py-4 text-red-500">
                              <button
                                className="border bg-red-500 hover:bg-red-800 rounded-md py-2 px-4 ml-2 text-white"
                                onClick={() => {
                                  handleDeleteCart(item.Product.id);
                                }}
                              >
                                x
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td
                          colSpan={5}
                          className="text-red-500 text-center py-8 font-bold"
                        >
                          No items found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* summary */}
            {items.length !== 0 && (
              <div className="md:w-1/4">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-lg font-semibold mb-4">Summary</h2>
                  <div className="flex justify-between mb-2">
                    <span>Subtotal</span>
                    <span>Rs {subTotal}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Total Quantity</span>
                    <span>{totalQuantity}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Shipping</span>
                    <span>Rs {shippingPrice}</span>
                  </div>
                  <hr className="my-2" />
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold">Total</span>
                    <span className="font-semibold">{total}</span>
                  </div>
                  <Link to="/checkout">
                    <button className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 w-full">
                      Checkout
                    </button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Cart;
