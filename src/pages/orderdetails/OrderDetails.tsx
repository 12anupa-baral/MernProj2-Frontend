import { useParams } from "react-router-dom";
import { cancelMyOrder, fetchMyOrder } from "../../store/checkoutSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useEffect } from "react";

const OrderDetails = () => {
  const { id } = useParams();
  const { orderDetails } = useAppSelector((store) => store.checkout);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (id) dispatch(fetchMyOrder(id));
  }, []);

  const handleCancelOrder = () => {
    if (id) {
      dispatch(cancelMyOrder(id));
    }
  };

  return (
    <div className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
      <div className="flex justify-start item-start space-y-2 flex-col">
        <h1 className="text-3xl dark:text-white lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">
          Order #{id}
        </h1>
        <h1 className="text-xl dark:text-white lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">
          Status {orderDetails[0]?.Order?.orderStatus}
        </h1>
        <p className="text-base dark:text-gray-300 font-medium leading-6 text-gray-600">
          {new Date(orderDetails[0]?.createdAt).toLocaleDateString()}
        </p>
      </div>
      <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
        <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
          <div className="flex flex-col justify-start items-start dark:bg-gray-800 bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
            <p className="text-lg md:text-xl dark:text-white font-semibold leading-6 xl:leading-5 text-gray-800">
              Your Order Detail
            </p>
            {orderDetails?.length > 0 ? (
              orderDetails.map((item) => {
                return (
                  <>
                    <div className="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full">
                      <div className="pb-4 md:pb-8 w-full md:w-40">
                        <img
                          className="w-full"
                          src={`http://localhost:3001/uploads/${item.Product.productImageUrl}`}
                          alt="dress"
                        />
                      </div>
                      <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
                        <div className="w-full flex flex-col justify-start items-start space-y-8">
                          <h3 className="text-xl dark:text-white xl:text-2xl font-semibold leading-6 text-gray-800">
                            {item.Product.productName}
                          </h3>
                          <div className="flex justify-start items-start flex-col space-y-2">
                            <p className="text-sm dark:text-white leading-none text-gray-800">
                              <span className="dark:text-gray-400 text-gray-300">
                                Desc:{" "}
                              </span>{" "}
                              {item?.Product?.productDescription}
                            </p>
                          </div>
                        </div>
                        <div className="flex justify-between space-x-8 items-start w-full">
                          <p className="text-base dark:text-white xl:text-lg leading-6">
                            Rs{item?.Product?.productPrice}
                            <span className="text-red-300 line-through">
                              {" "}
                              Rs{" "}
                              {item?.Product?.productPrice +
                                (15 / 100) * item?.Product?.productPrice}
                            </span>
                          </p>
                          <p className="text-base dark:text-white xl:text-lg leading-6 text-gray-800">
                            {item.quantity}
                          </p>
                          <p className="text-base dark:text-white xl:text-lg font-semibold leading-6 text-gray-800">
                            Rs {item.quantity * item?.Product?.productPrice}
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })
            ) : (
              <p>You don't have any pending orders!</p>
            )}
          </div>
          <div className="flex justify-center  md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
            <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6">
              <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">
                Summary
              </h3>
              <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                <div className="flex justify-between w-full">
                  <p className="text-base dark:text-white leading-4 text-gray-800">
                    Subtotal
                  </p>
                  <p className="text-base dark:text-gray-300 leading-4 text-gray-600">
                    Rs {orderDetails[0]?.Order?.totalAmount}
                  </p>
                </div>
                <div className="flex justify-between items-center w-full">
                  <p className="text-base dark:text-white leading-4 text-gray-800">
                    Discount{" "}
                    <span className="bg-gray-200 p-1 text-xs font-medium dark:bg-white dark:text-gray-800 leading-3 text-gray-800">
                      STUDENT
                    </span>
                  </p>
                  <p className="text-base dark:text-gray-300 leading-4 text-gray-600">
                    Rs {(15 / 100) * orderDetails[0]?.Order.totalAmount} (15%)
                  </p>
                </div>
                <div className="flex justify-between items-center w-full">
                  <p className="text-base dark:text-white leading-4 text-gray-800">
                    Shipping
                  </p>
                  <p className="text-base dark:text-gray-300 leading-4 text-gray-600">
                    Rs 100
                  </p>
                </div>
              </div>
              <div className="flex justify-between items-center w-full">
                <p className="text-base dark:text-white font-semibold leading-4 text-gray-800">
                  Total
                </p>
                <p className="text-base dark:text-gray-300 font-semibold leading-4 text-gray-600">
                  Rs{" "}
                  {orderDetails[0]?.Order?.totalAmount -
                    (15 / 100) * orderDetails[0]?.Order?.totalAmount +
                    100}
                </p>
              </div>
            </div>
            <div className="flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6">
              <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">
                Shipping
              </h3>
              <div className="flex justify-between items-start w-full">
                <div className="flex justify-center items-center space-x-4">
                  <div className="w-8 h-8">
                    <img
                      className="w-full h-full"
                      alt="logo"
                      src="https://i.ibb.co/L8KSdNQ/image-3.png"
                    />
                  </div>
                  <div className="flex flex-col justify-start items-center">
                    <p className="text-lg leading-6 dark:text-white font-semibold text-gray-800">
                      DPD Delivery
                      <br />
                      <span className="font-normal">
                        Delivery with 24 Hours
                      </span>
                    </p>
                  </div>
                </div>
                <p className="text-lg font-semibold leading-6 dark:text-white text-gray-800">
                  Rs 100
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 dark:bg-gray-800 w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col">
          <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">
            Customer
          </h3>
          <div className="flex flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0">
            <div className="flex flex-col justify-start items-start flex-shrink-0">
              <div className="flex justify-center w-full md:justify-start items-center space-x-4 py-8 border-b border-gray-200">
                <div className="flex justify-start items-start flex-col space-y-2">
                  <p className="text-base dark:text-white font-semibold leading-4 text-left text-gray-800">
                    {orderDetails[0]?.Order?.firstName +
                      " " +
                      orderDetails[0]?.Order?.lastName}
                  </p>
                  <p className="text-sm dark:text-gray-300 leading-5 text-gray-600">
                    Quantity {orderDetails[0]?.quantity}
                  </p>
                </div>
              </div>

              <div className="flex justify-center text-gray-800 dark:text-white md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full">
                <img
                  className="dark:hidden"
                  src="https://tuk-cdn.s3.amazonaws.com/can-uploader/order-summary-3-svg1.svg"
                  alt="email"
                />
                <img
                  className="hidden dark:block"
                  src="https://tuk-cdn.s3.amazonaws.com/can-uploader/order-summary-3-svg1dark.svg"
                  alt="email"
                />
                <p className="cursor-pointer text-sm leading-5 ">
                  {orderDetails[0]?.Order?.email}
                </p>
              </div>
            </div>
            <div className="flex justify-between xl:h-full items-stretch w-full flex-col mt-6 md:mt-0">
              <div className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row items-center md:items-start">
                <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4 xl:mt-8">
                  <p className="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">
                    Shipping Address
                  </p>
                  <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                    {orderDetails[0]?.Order?.addressLine}
                  </p>
                </div>
                <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4">
                  <p className="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">
                    Billing Address
                  </p>
                  <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                    {orderDetails[0]?.Order?.state +
                      ", " +
                      orderDetails[0]?.Order?.city}
                  </p>
                </div>
              </div>
              <div className="flex w-full justify-center items-center md:justify-start md:items-start">
                <button className="mt-6 md:mt-0   py-5 hover:bg-hardPrimary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 border bg-primary border-gray-800  w-96 2xl:w-full text-base font-medium leading-4 text-white">
                  Edit Details
                </button>
                {orderDetails[0]?.Order?.orderStatus !== "cancelled" && (
                  <button
                    onClick={handleCancelOrder}
                    className="mt-6 md:mt-0 text-white py-5 hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 border bg-red-500 border-gray-800  w-96 2xl:w-full text-base font-medium leading-4 "
                  >
                    Cancel Order
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails