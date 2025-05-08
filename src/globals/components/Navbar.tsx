import { Link } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import { useEffect, useState } from "react";
import { CircleX, Menu } from "lucide-react";
import { LogIn, LogOut, UserPlus } from "lucide-react";

// Mobile Modal Component
const MobileModal = ({ isOpen, toggleModal, isLoggedIn }: any) => {
  return (
    <div
      className={`fixed inset-0 bg-gray-600 bg-opacity-50 z-40 flex justify-end transition-transform transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="w-64 bg-white h-full p-4 overflow-y-auto transition-all duration-300 ease-in-out">
        {/* Close Button */}
        <button
          onClick={toggleModal}
          className="text-xl text-gray-700 absolute top-4 right-4"
        >
          <CircleX />
        </button>

        {/* Navigation Links */}
        <div className="flex flex-col gap-6 mt-10">
          <Link className="navItems text-lg" to="/" onClick={toggleModal}>
            Home
          </Link>
          <Link
            className="navItems text-lg"
            to="/products"
            onClick={toggleModal}
          >
            Products
          </Link>
          <Link className="navItems text-lg" to="/cart" onClick={toggleModal}>
            Cart
          </Link>

          <Link
            className="navItems text-lg"
            to="/myorder"
            onClick={toggleModal}
          >
            My Orders
          </Link>
          <Link className="navItems text-lg" to="/about" onClick={toggleModal}>
            About Us
          </Link>
          <Link
            className="navItems text-lg"
            to="/contact"
            onClick={toggleModal}
          >
            Contact Us
          </Link>

          {/* Auth Buttons */}
          <div className="flex flex-col gap-2 mt-4">
            {isLoggedIn ? (
              <Link to="/logout">
                <button
                  type="button"
                  className="py-3 px-6 text-sm bg-primary hover:bg-hardPrimary rounded text-white"
                  onClick={toggleModal}
                >
                  Logout
                </button>
              </Link>
            ) : (
              <>
                <Link to="/register">
                  <button
                    type="button"
                    className="py-3 px-6 text-sm bg-primary hover:bg-hardPrimary rounded text-white"
                    onClick={toggleModal}
                  >
                    Register
                  </button>
                </Link>
                <Link to="/login">
                  <button
                    type="button"
                    className="py-3 px-6 text-sm bg-primary hover:bg-hardPrimary rounded text-white"
                    onClick={toggleModal}
                  >
                    Login
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Navbar Component
function Navbar() {
  const reduxToken = useAppSelector((store) => store.auth.user.token);
  const localStorageToken = localStorage.getItem("token");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!localStorageToken || !!reduxToken);
  }, [reduxToken, localStorageToken]);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  return (
    <header className="sticky top-0 bg-white shadow z-50">
      <div className="navbar flex justify-between items-center px-4 sm:px-16 py-4">
        {/* Logo */}
        <Link className="text-xl font-bold text-primary" to="/">
          Ecobazar
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden sm:flex gap-6">
          <Link className="navItems" to="/">
            Home
          </Link>
          <Link className="navItems" to="/products">
            Products
          </Link>
          <Link className="navItems" to="/cart">
            Cart
          </Link>
          <Link className="navItems" to="/myorder">
            My Orders
          </Link>
          <Link className="navItems" to="/about">
            About Us
          </Link>
          <Link className="navItems" to="/contact">
            Contact Us
          </Link>
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          {isLoggedIn ? (
            <Link to="/logout" title="Logout">
              <button
                type="button"
                className="p-2 bg-primary hover:bg-hardPrimary rounded text-white"
              >
                <LogOut size={20} />
              </button>
            </Link>
          ) : (
            <>
              <Link to="/register" title="Register">
                <button
                  type="button"
                  className="p-2 bg-primary hover:bg-hardPrimary rounded text-white"
                >
                  <UserPlus size={20} />
                </button>
              </Link>
              <Link to="/login" title="Login">
                <button
                  type="button"
                  className="p-2 bg-primary hover:bg-hardPrimary rounded text-white"
                >
                  <LogIn size={20} />
                </button>
              </Link>
            </>
          )}
        </div>

        {/* Hamburger Menu for Mobile */}
        <div className="sm:hidden flex items-center">
          <button onClick={toggleModal} className="text-primary">
            <Menu />
          </button>
        </div>
      </div>

      {/* Side Modal for Mobile */}
      <MobileModal
        isOpen={isModalOpen}
        toggleModal={toggleModal}
        isLoggedIn={isLoggedIn}
      />
    </header>
  );
}

export default Navbar;
