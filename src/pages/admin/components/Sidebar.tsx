import { Link } from "react-router-dom";
import {
  Users,
  ShoppingCart,
  Banknote,
  Settings,
  LayoutDashboard,
  PackageSearch,
  LucideIcon
} from "lucide-react";

type SidebarLinkProps = {
  icon: LucideIcon;
  label: string;
};


const Sidebar = () => {
  const SidebarLink = ({ icon: Icon, label }:SidebarLinkProps) => (
    <Link
      to={`/admin/${label.toLowerCase()}`}
      className="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700"
    >
      <Icon className="w-5 h-5 mr-2" />
      {label}
    </Link>
  );

  return (
    <div className="hidden md:flex flex-col w-64 bg-gray-800">
      <div className="flex items-center justify-center h-16 bg-gray-900">
        <span className="text-white font-bold uppercase">
          Ecobazar Dashboard
        </span>
      </div>
      <div className="flex flex-col flex-1 overflow-y-auto">
        <nav className="flex-1 px-2 py-4 bg-gray-800">
          <SidebarLink icon={LayoutDashboard} label="Categories" />
          <SidebarLink icon={PackageSearch} label="Products" />
          <SidebarLink icon={ShoppingCart} label="Orders" />
          <SidebarLink icon={Users} label="Users" />
          <SidebarLink icon={Banknote} label="Payments" />
          <SidebarLink icon={Settings} label="Settings" />
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
