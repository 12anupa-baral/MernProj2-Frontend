import React from "react";
import { Outlet } from "react-router-dom";
import Searchbar from "./Searchbar";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Topbar from "./Topbar";

const MainLayout = () => {
  return (
    <>
      <Topbar />
      <Searchbar />
      <Navbar />
      <main className="px-[5%] sm:px-[10%] py-[2%]">
        <Outlet />
      </main>

      <Footer />
    </>
  );
};

export default MainLayout;
