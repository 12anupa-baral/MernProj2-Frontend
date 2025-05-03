import React from "react";
import NotFound from "../icons/NotFound";
import { Link } from "react-router-dom";

const PageNotFound = () => {

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center text-center px-4 py-10">
      <NotFound />

      <h1 className="text-zinc-900 text-4xl md:text-5xl font-semibold font-poppins mt-8">
        Oops! Page not found
      </h1>

      <p className="text-zinc-500 text-base font-normal font-poppins mt-4 max-w-xl">
       Sorry, the page you are trying to reach is not available.
      </p>

      <Link
       to="/"
        className="mt-6 px-6 py-3 bg-green-600 text-white text-sm font-semibold font-poppins rounded-full hover:bg-green-700 transition"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default PageNotFound;
