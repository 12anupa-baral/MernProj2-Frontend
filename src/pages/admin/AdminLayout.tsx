import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import { Menu, LogOut } from "lucide-react";

const Admindashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-y-auto">
        <div className="flex items-center justify-between h-16 bg-white border-b border-gray-200">
          <div className="flex items-center px-4 w-full">
            <button className="text-gray-500 focus:outline-none focus:text-gray-700">
              <Menu className="w-6 h-6" />
            </button>
            <input
              className="mx-4 w-full border rounded-md px-4 py-2"
              type="text"
              placeholder="Search"
            />
          </div>
          <div className="flex items-center pr-4">
            <button className="text-gray-500 hover:text-gray-700 focus:outline-none">
              <LogOut className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Admindashboard;
