import React from "react";
import { Link } from "react-router-dom";
import Button from "../../../globals/components/Button";

interface DealsCardItem {
  image: string;
  heading: string;
  subheading: string;
  description?: string; 
}

interface DealsCardProps {
  deals: DealsCardItem;
}

const DealsCard: React.FC<DealsCardProps> = ({ deals }) => {
  return (
    <div className="w-full lg:w-80 h-[400px] sm:h-[500px] md:h-[536px] relative rounded-lg overflow-hidden shadow-lg">
      <img
        className="w-full h-full object-cover"
        src={deals.image}
        alt={deals.heading || "Deal image"}
      />

      {/* Overlay Content */}
      <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-white px-4 text-center">
        <p className="text-xs sm:text-sm font-medium uppercase tracking-wide mb-1 sm:mb-2">
          {deals.subheading}
        </p>
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2 sm:mb-4">
          {deals.heading}
        </h2>
        {deals.description && (
          <p className="text-xs sm:text-sm mb-4 sm:mb-6">{deals.description}</p>
        )}

        <Link to="#">
          <Button />
        </Link>
      </div>
    </div>
  );
};

export default DealsCard;
