import { ArrowRight } from "lucide-react";
import React from "react";

const DiscountBanner = () => {
  return (
    <div className="max-w-[1320px] w-full h-auto relative rounded-[10px] bg-[url(/Assets/Discount_Bannar.png)] bg-cover bg-center p-6 sm:p-10 lg:h-96 mx-auto">
      <div className="flex flex-col lg:absolute lg:left-[65%] lg:top-[60px] gap-6">
        {/* Header Section */}
        <div className="flex flex-col gap-3">
          <p className="text-white text-sm sm:text-base font-medium uppercase tracking-tight font-poppins leading-none">
            Summer Sale
          </p>
          <div className="flex items-baseline gap-2">
            <span className="text-amber-500 text-4xl sm:text-6xl font-semibold font-poppins leading-tight">
              37%
            </span>
            <span className="text-white text-4xl sm:text-6xl font-normal font-poppins leading-tight">
              OFF
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-white text-sm sm:text-base font-normal opacity-70 font-poppins leading-normal max-w-md">
          Free on all your order, Free Shipping and 30 days money-back guarantee
        </p>

        {/* Button */}
        <div className="px-6 py-3 sm:px-10 sm:py-4 bg-green-600 rounded-full flex items-center gap-3 sm:gap-4 w-fit cursor-pointer hover:bg-green-700 transition">
          <span className="text-white text-sm sm:text-base font-semibold font-poppins leading-tight">
            Shop Now
          </span>
          <ArrowRight className="text-white w-4 h-4 sm:w-5 sm:h-5" />
        </div>
      </div>
    </div>
  );
};

export default DiscountBanner;
