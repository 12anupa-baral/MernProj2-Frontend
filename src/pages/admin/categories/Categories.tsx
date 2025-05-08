import { useEffect, useState } from "react"
import Table from "./components/Table"
import axios from "axios"


export interface ICategoryData {
  id: string;
  categoryName: string;
  createdAt: Date;
  updatedAt: Date;
};


const Categories = () => {
  const [categories, setCategories] = useState<ICategoryData[]>([])
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:3001/api/category");
        setCategories(res.data.data);
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }
    };
  
    fetchCategories();
  },[])
  return (
    <div className="flex flex-col">
      <div className=" overflow-x-auto">
        <div className="min-w-full inline-block align-middle">
            <div className="relative  text-gray-500 focus-within:text-gray-900 mb-4 flex justify-between">
                
            <input type="text" id="default-search" className="block w-80 h-11 pr-5 pl-12 py-2.5 text-base font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none" placeholder="Search for company" />
           <button className="bg-blue-500 text-white px-3 rounded-lg">Add Category</button>
            </div>
          <div className="overflow-hidden ">
          <Table data={categories} /> 
           
            </div>
        </div>
      </div>
      </div>
  )
}

export default Categories