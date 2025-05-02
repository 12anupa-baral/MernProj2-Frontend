import React from "react";
import { Star } from "lucide-react";
import Quote from "../../../icons/Quote";

interface User {
  avatar?: string;
  name?: string;
  role?: string;
  rating?: number;
}

interface Testimonial {
  content?: string;
  user?: User;
}

interface TestimonialCardProps {
  testimonials?: Testimonial;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  testimonials = {},
}) => {
  const { content, user = {} } = testimonials;
  const { avatar, name = "Anonymous", role = "User", rating = 0 } = user;

  return (
    <div className="p-6 bg-white rounded-lg shadow-[0px_10px_20px_0px_rgba(0,0,0,0.01)] flex flex-col justify-start items-start gap-4 w-full max-w-md">
      <Quote />
      <p className="text-neutral-600 text-sm font-normal font-['Poppins'] leading-tight">
        {content}
      </p>
      <div className="pt-2 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 w-full">
        <div className="flex items-center gap-3">
          <img
            className="w-14 h-14 rounded-full object-cover"
            src={avatar || "/default-avatar.png"}
            alt={`${name}'s avatar`}
          />
          <div className="flex flex-col">
            <span className="text-zinc-900 text-base font-medium font-['Poppins'] leading-normal">
              {name}
            </span>
            <span className="text-neutral-400 text-sm font-normal font-['Poppins'] leading-tight">
              {role}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-px">
          {[...Array(5)].map((_, index) => (
            <Star
              key={index}
              size={16}
              className={
                index < rating
                  ? "text-yellow-500 fill-yellow-500"
                  : "text-gray-300"
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
