import { useEffect, useState } from "react";
import Table from "./components/Table";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { fetchCategory } from "../../../store/adminCategorySlice";
import Modal from "./components/Modal";

export interface ICategoryData {
  id: string;
  categoryName: string;
  createdAt: Date;
  updatedAt: Date;
}

const Categories = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { items: categories } = useAppSelector((store) => store.category);
  useEffect(() => {
    dispatch(fetchCategory());
  }, []);

  const filteredCategories = categories?.filter(
    (category) =>
      category?.categoryName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.id.includes(searchTerm)
  );

  const handleModelOpen = () => {
    setIsModalOpen(true);
  };
  const handleModelClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col">
      <div className=" overflow-x-auto">
        <div className="min-w-full inline-block align-middle">
          <div className="relative  text-gray-500 focus-within:text-gray-900 mb-4 flex justify-between">
            <input
              type="text"
              id="default-search"
              className="block w-80 h-11 pr-5 pl-12 py-2.5 text-base font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none"
              placeholder="Search for categoeies"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              onClick={() => handleModelOpen()}
              className="bg-blue-500 text-white px-3 rounded-lg"
            >
              Add Category
            </button>
          </div>
          <div className="overflow-hidden ">
            <Table data={filteredCategories} />
          </div>
        </div>
      </div>
      {isModalOpen && <Modal onClose={handleModelClose} />}
    </div>
  );
};

export default Categories;
