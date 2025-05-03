import { ArrowRight } from 'lucide-react'
import React from 'react'
import { Link } from "react-router-dom";

const Button = () => {
  return (
    <Link
      to="/products"
      className="w-48 h-12 bg-white rounded-[53px] flex items-center justify-center gap-2 group hover:bg-green-50 transition"
    >
      <span className="text-softPrimary text-base font-semibold font-['Poppins']">
        Shop now
      </span>

      <ArrowRight className="text-softPrimary" />
    </Link>
  );
};

export default Button