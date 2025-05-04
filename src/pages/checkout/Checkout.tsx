import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Phone } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { IData, paymentMethod } from "./type";
import { orderItem } from "../../store/checkoutSlice";
import { toast } from "react-toastify";

const Checkout = () => {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((store) => store.cart);
  const { khaltiUrl } = useAppSelector((store) => store.checkout);
  const productData =
    items.length > 0
      ? items.map((item) => {
          return {
            productId: item.Product.id,
            productQty: item.quantity,
          };
        })
      : [];

  const [data, setData] = useState<IData>({
    firstName: "",
    lastName: "",
    email: "",
    addressLine: "",
    city: "",
    state: "",
    zipcode: "",
    phoneNumber: 0,
    totalAmount: 0,
    paymentMethod: paymentMethod.cod,
    products: productData,
  });

  const [errors, setErrors] = useState<Partial<IData>>({});

  const subTotal = items.reduce(
    (total, item) => total + item.Product.productPrice * item.quantity,
    0
  );

  const totalQuantity = items.reduce((total, item) => total + item.quantity, 0);
  const shippingPrice = 100;
  const total = subTotal + shippingPrice;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // Clear error when user types
    if (errors[name as keyof IData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value as paymentMethod,
    }));
  };

  const validate = (): boolean => {
    const newErrors: Partial<IData> = {};
    if (!data.firstName) newErrors.firstName = "First name is required";
    if (!data.lastName) newErrors.lastName = "Last name is required";
    if (!data.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!data.addressLine) newErrors.addressLine = "Address is required";
    if (!data.city) newErrors.city = "City is required";
    if (!data.state) newErrors.state = "State is required";
    if (!data.zipcode) newErrors.zipcode = "ZIP code is required";
    if (!data.state) newErrors.state = "State is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    if (items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    await dispatch(
      orderItem({
        ...data,
        products: productData,
        totalAmount: total,
      })
    );
  };

  useEffect(() => {
    if (khaltiUrl) {
      window.location.href = khaltiUrl;
      return;
    }
  }, [khaltiUrl]);
  console.log(khaltiUrl);

  return (
    <form onSubmit={handleSubmit} className="bg-gray-50 min-h-screen">
      <div className="flex flex-col items-center border-b bg-white py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32">
        <div className="mt-4 py-2 text-xs sm:mt-0 sm:ml-auto sm:text-base">
          <div className="relative">
            <ul className="relative flex w-full items-center justify-between space-x-2 sm:space-x-4">
              <li className="flex items-center space-x-3 text-left sm:space-x-4">
                <a
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-200 text-xs font-semibold text-emerald-700"
                  href="#"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </a>
                <span className="font-semibold text-gray-900">Shop</span>
              </li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
              <li className="flex items-center space-x-3 text-left sm:space-x-4">
                <a
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-600 text-xs font-semibold text-white ring ring-gray-600 ring-offset-2"
                  href="#"
                >
                  2
                </a>
                <span className="font-semibold text-gray-900">Shipping</span>
              </li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
              <li className="flex items-center space-x-3 text-left sm:space-x-4">
                <a
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-400 text-xs font-semibold text-white"
                  href="#"
                >
                  3
                </a>
                <span className="font-semibold text-gray-500">Payment</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
        <div className="px-4 pt-8">
          <p className="text-xl font-medium">Order Summary</p>
          <p className="text-gray-400">
            Check your items. And select a suitable shipping method.
          </p>
          <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
            {items.length > 0 ? (
              items.map((item) => (
                <div
                  key={item.Product.id}
                  className="flex flex-col rounded-lg bg-white sm:flex-row"
                >
                  <img
                    className="m-2 h-24 w-28 rounded-md border object-cover object-center"
                    src={`http://localhost:3001/uploads/${item?.Product?.productImageUrl}`}
                    alt={item.Product.productName}
                  />
                  <div className="flex w-full flex-col px-4 py-4">
                    <span className="font-semibold">
                      {item.Product.productName}
                    </span>
                    <span className="float-right text-gray-400">
                      Quantity: {item.quantity}
                    </span>
                    <p className="text-lg font-bold">
                      Rs {item.Product.productPrice}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="py-4 text-center text-gray-500">
                Your cart is empty
              </p>
            )}
          </div>

          <p className="mt-8 text-lg font-medium">Shipping Methods</p>
          <div className="mt-5 grid gap-6">
            <div className="relative">
              <input
                className="peer hidden"
                id="radio_1"
                type="radio"
                name="shippingMethod"
                checked
                readOnly
              />
              <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
              <label
                className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                htmlFor="radio_1"
              >
                <img
                  className="w-14 object-contain"
                  src="/images/naorrAeygcJzX0SyNI4Y0.png"
                  alt="Fedex Delivery"
                />
                <div className="ml-5">
                  <span className="mt-2 font-semibold">Fedex Delivery</span>
                  <p className="text-slate-500 text-sm leading-6">
                    Delivery: 2-4 Days
                  </p>
                </div>
              </label>
            </div>
          </div>
        </div>
        <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
          <p className="text-xl font-medium">Payment Details</p>
          <p className="text-gray-400">
            Complete your order by providing your payment details.
          </p>
          <div className="">
            <label
              htmlFor="email"
              className="mt-4 mb-2 block text-sm font-medium"
            >
              Email
            </label>
            <div className="relative">
              <input
                type="text"
                id="email"
                name="email"
                value={data.email}
                onChange={handleChange}
                className={`w-full rounded-md border ${
                  errors.email ? "border-red-500" : "border-gray-200"
                } px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500`}
                placeholder="your.email@gmail.com"
              />
              <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="relative">
                <label
                  htmlFor="firstName"
                  className="mb-2 block text-sm font-medium"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={data.firstName}
                  onChange={handleChange}
                  className={`w-full rounded-md border ${
                    errors.firstName ? "border-red-500" : "border-gray-200"
                  } px-4 py-3 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500`}
                  placeholder="First Name"
                />
                {errors.firstName && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.firstName}
                  </p>
                )}
              </div>
              <div className="relative">
                <label
                  htmlFor="lastName"
                  className="mb-2 block text-sm font-medium"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={data.lastName}
                  onChange={handleChange}
                  className={`w-full rounded-md border ${
                    errors.lastName ? "border-red-500" : "border-gray-200"
                  } px-4 py-3 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500`}
                  placeholder="Last Name"
                />
                {errors.lastName && (
                  <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>
                )}
              </div>
            </div>

            <div className="mt-4">
              <label
                htmlFor="phoneNumber"
                className="mb-2 block text-sm font-medium"
              >
                Phone Number
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={data.phoneNumber}
                  onChange={handleChange}
                  className={`w-full rounded-md border ${
                    errors.phoneNumber ? "border-red-500" : "border-gray-200"
                  } px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500`}
                  placeholder="+977"
                />
                <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                  <Phone className="size-4 text-gray-400" />
                </div>
                {errors.phoneNumber && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.phoneNumber}
                  </p>
                )}
              </div>
            </div>

            <label
              htmlFor="addressLine"
              className="mt-4 mb-2 block text-sm font-medium"
            >
              Billing Address
            </label>
            <div className="grid gap-4">
              <div className="relative">
                <input
                  type="text"
                  id="addressLine"
                  name="addressLine"
                  value={data.addressLine}
                  onChange={handleChange}
                  className={`w-full rounded-md border ${
                    errors.addressLine ? "border-red-500" : "border-gray-200"
                  } px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500`}
                  placeholder="Street Address"
                />
                {errors.addressLine && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.addressLine}
                  </p>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={data.city}
                    onChange={handleChange}
                    className={`w-full rounded-md border ${
                      errors.city ? "border-red-500" : "border-gray-200"
                    } px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500`}
                    placeholder="City"
                  />
                  {errors.city && (
                    <p className="mt-1 text-sm text-red-500">{errors.city}</p>
                  )}
                </div>
                <div className="relative">
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={data.state}
                    onChange={handleChange}
                    className={`w-full rounded-md border ${
                      errors.state ? "border-red-500" : "border-gray-200"
                    } px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500`}
                    placeholder="State"
                  />
                  {errors.state && (
                    <p className="mt-1 text-sm text-red-500">{errors.state}</p>
                  )}
                </div>
              </div>
              <div className="relative">
                <input
                  type="text"
                  id="zipcode"
                  name="zipcode"
                  value={data.zipcode}
                  onChange={handleChange}
                  className={`w-full rounded-md border ${
                    errors.zipcode ? "border-red-500" : "border-gray-200"
                  } px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500`}
                  placeholder="ZIP Code"
                />
                {errors.zipcode && (
                  <p className="mt-1 text-sm text-red-500">{errors.zipcode}</p>
                )}
              </div>
            </div>

            <label
              htmlFor="paymentMethod"
              className="mt-4 mb-2 block text-sm font-medium"
            >
              Payment Method
            </label>
            <select
              id="paymentMethod"
              name="paymentMethod"
              value={data.paymentMethod}
              onChange={handleSelectChange}
              className="w-full rounded-md border border-gray-200 py-3 px-2 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
            >
              <option value={paymentMethod.cod}>Cash On Delivery</option>
              <option value={paymentMethod.Khalti}>Khalti</option>
              <option value={paymentMethod.Esewa}>Esewa</option>
            </select>

            <div className="mt-6 border-t border-b py-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">Subtotal</p>
                <p className="font-semibold text-gray-900">
                  Rs {subTotal.toFixed(2)}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">
                  Total Quantity
                </p>
                <p className="font-semibold text-gray-900">{totalQuantity}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">Shipping</p>
                <p className="font-semibold text-gray-900">
                  Rs {shippingPrice.toFixed(2)}
                </p>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900">Total</p>
              <p className="text-2xl font-semibold text-gray-900">
                Rs {total.toFixed(2)}
              </p>
            </div>
          </div>
          {data.paymentMethod === paymentMethod.Esewa && (
            <button
              className="mt-4 mb-8 w-full rounded-md bg-green-500 px-6 py-3 font-medium text-white hover:bg-gray-800 transition-colors"
              type="submit"
              disabled={items.length === 0}
            >
              Pay with Esewa
            </button>
          )}
          {data.paymentMethod === paymentMethod.Khalti && (
            <button
              className="mt-4 mb-8 w-full rounded-md bg-purple-500 px-6 py-3 font-medium text-white hover:bg-gray-800 transition-colors"
              type="submit"
              disabled={items.length === 0}
            >
              Pay with Khalti
            </button>
          )}
          {data.paymentMethod === paymentMethod.cod && (
            <button
              className="mt-4 mb-8 w-full rounded-md bg-gray-500 px-6 py-3 font-medium text-white hover:bg-gray-800 transition-colors"
              type="submit"
              disabled={items.length === 0}
            >
              Cash on Delivery
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

export default Checkout;
