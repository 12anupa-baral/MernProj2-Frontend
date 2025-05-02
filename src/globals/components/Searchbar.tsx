import React, { useEffect, useState } from "react";
import { Heart, Search } from "lucide-react";
import { Link } from "react-router-dom";
import ShoppingBag from "../../icons/ShoppingBag";
import Logo from "../../icons/Logo";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchCartItems } from "../../store/cartSlice";

const Searchbar = () => {
  const reduxToken = useAppSelector((store) => store.auth.user.token);
  const cartItems = useAppSelector((store) => store.cart.items);
  const localStorageToken = localStorage.getItem("tokenHoYo");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = localStorageToken || reduxToken;
    const loggedIn = !!token;
    setIsLoggedIn(loggedIn);

    if (loggedIn) {
      dispatch(fetchCartItems());
    }
  }, [reduxToken, dispatch, localStorageToken]);

  return (
    <div className="w-full h-24 flex items-center justify-between px-6 md:px-16 bg-white relative">
      {/* Logo Section */}
      <Link to="/" className="flex items-center gap-2">
        <Logo />
        <span className="text-green-950 text-xl md:text-3xl font-medium font-poppins">
          Ecobazar
        </span>
      </Link>

      {/* Mobile Search Icon */}
      <div className="block md:hidden">
        <Search className="text-zinc-500" size={24} aria-label="Search" />
      </div>

      {/* Search Bar (visible on larger screens) */}
      <div className="hidden md:flex items-center w-full max-w-lg border border-neutral-200 rounded-md overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-3 w-full">
          <Search
            className="text-zinc-500"
            size={18}
            aria-label="Search Icon"
          />
          <input
            type="text"
            placeholder="Search"
            className="w-full text-base text-zinc-500 font-normal font-poppins focus:outline-none"
          />
        </div>
        <button
          className="px-6 py-3.5 bg-primary text-white text-sm font-semibold font-poppins rounded-tr-md rounded-br-md"
          type="button" // Prevent accidental form submission
        >
          Search
        </button>
      </div>

      {/* Cart & Wishlist */}
      {isLoggedIn && (
        <div className="flex items-center gap-6 sm:gap-4">
          <Heart className="text-zinc-700" aria-label="Wishlist" />

          <div className="w-px h-6 bg-stone-300 rotate-0" />

          <Link to="/cart" className="flex items-center gap-2">
            <div className="relative">
              <sup className="absolute -top-2 -right-2 text-xs text-white bg-red-500 rounded-full w-5 h-5 flex items-center justify-center">
                {cartItems?.length > 0 ? cartItems?.length : 0}
              </sup>
              <ShoppingBag aria-label="Cart" />
            </div>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Searchbar;
