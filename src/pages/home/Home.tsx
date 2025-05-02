import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchProducts } from "../../store/productSlice";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Card from "../product/components/Card";
import CategoryCard from "./components/CategoryCard";
import DealsCard from "./components/DealsCard";
import DiscountBanner from "./components/DiscountBanner";
import TestimonialCard from "./components/TestimonialCard";

const DealsCardContent = [
  {
    image: "/Assets/Deal1.png",
    description: "Time running",
    subheading: "Best Deals",
    heading: "Sale of the Month",
  },
  {
    image: "/Assets/Deal2.png",
    description: "Time running",
    subheading: "Summer Sale",
    heading: "100% Fresh Fruit",
  },
  {
    image: "/Assets/Deal3.png",
    description: "Time running",
    subheading: "85% Fat Free",
    heading: "Low-Fat Meat",
  },
];

const Testimonials = [
  {
    content:
      "Pellentesque eu nibh eget mauris congue mattis mattis nec tellus. Phasellus imperdiet elit eu magna dictum, bibendum cursus velit sodales. Donec sed neque eget",
    user: {
      avatar: "Assets/BG.png",
      role: "customer",
      name: "Eleanor Pena",
      rating: 1,
    },
  },
  {
    content:
      "Pellentesque eu nibh eget mauris congue mattis mattis nec tellus. Phasellus imperdiet elit eu magna dictum, bibendum cursus velit sodales. Donec sed neque eget",
    user: {
      avatar: "Assets/BG.png",
      role: "customer",
      name: "Robert Fox",
      rating: 5,
    },
  },
  {
    content:
      "Pellentesque eu nibh eget mauris congue mattis mattis nec tellus. Phasellus imperdiet elit eu magna dictum, bibendum cursus velit sodales. Donec sed neque eget",
    user: {
      avatar: "Assets/BG.png",
      role: "customer",
      name: "Dianne Russell",
      rating: 3,
    },
  },
];

function Home() {
  const [category, setCategory] = useState([]);
  const dispatch = useAppDispatch();
  const { products } = useAppSelector((store) => store.products);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/category");
        const data = await res.json();
        setCategory(data.data);
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }
    };

    fetchCategories();
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div>
      <main className="text-gray-900">
        <Hero />

        <div className="mt-8">
          <Services />
        </div>

        {/* Popular Categories */}

        <section>
          <div className="container mx-auto py-9 px-4 sm:px-6 lg:px-8">
            <h2 className="headers text-center">Popular Category</h2>
            <div className="grid grid-cols-2 2xl:grid-cols-4 gap-6 pt-6 w-full">
              {category.map((item, index) => (
                <CategoryCard key={index} category={item} />
              ))}
            </div>
          </div>
        </section>

        {/* Popular Products */}
        <section>
          <div className="container mx-auto py-9 px-4 sm:px-6 lg:px-8">
            <h2 className="headers text-center">Popular Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-6">
              {products.map((product, index) => (
                <Card key={index} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* Deals */}
        <section>
          <div className="container mx-auto py-9 px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
              {DealsCardContent.map((deals, index) => (
                <DealsCard key={index} deals={deals} />
              ))}
            </div>
          </div>
        </section>

        {/* Discount Banner */}
        <DiscountBanner />

        {/* Featured Products */}
        <section>
          <div className="container mx-auto py-9 px-4 sm:px-6 lg:px-8">
            <h2 className="headers text-center">Featured Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-6">
              {products.map((product, index) => (
                <Card key={index} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section>
          <div className="container mx-auto py-9 px-4 sm:px-6 lg:px-8">
            <h2 className="headers text-center">Client Testimonials</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
              {Testimonials.map((testimonial, index) => (
                <TestimonialCard key={index} testimonials={testimonial} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;
