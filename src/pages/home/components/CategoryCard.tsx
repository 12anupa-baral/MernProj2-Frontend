import { Link } from "react-router-dom";

interface CategoryItems {
  category: {
    imgurl: string;
    categoryName: string;
  };
}

const CategoryCard: React.FC<CategoryItems> = ({ category }) => {
  return (
    <Link to="#">
      <div className="w-full sm:w-60 md:w-64 lg:w-72 bg-white shadow-md rounded-xl duration-300 hover:scale-105 hover:shadow-xl overflow-hidden">
        <div className="aspect-w-1 aspect-h-1">
          <img
            src={category?.imgurl || "/Assets/BG.png"}
            alt={category?.categoryName}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="text-center text-base sm:text-lg md:text-xl font-medium text-black py-4 px-2">
          {category?.categoryName}
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard
