import React from "react";

const AboutUs = () => {
  return (
    <div className="max-w-screen-xl mx-auto px-4 py-10">
      {/* Image Section */}
      <div
        className="h-[50vh] bg-cover bg-center bg-no-repeat rounded-xl"
        style={{ backgroundImage: "url('Assets/veggies.webp')" }}
      ></div>

      {/* Text Section */}
      <div className="mt-10 text-center">
        <span className="text-gray-500 border-b-2 border-primary uppercase tracking-wide">
          About us
        </span>
        <h2 className="my-4 font-bold text-3xl sm:text-4xl">
          About <span className="text-primary">Our Company</span>
        </h2>
        <p className="text-gray-700 max-w-3xl mx-auto">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid,
          commodi doloremque, fugiat illum magni minus nisi nulla numquam
          obcaecati placeat quia, repellat tempore voluptatum.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
