import { useState } from "react";
import { Link } from "@remix-run/react";

function Navbar({ authenticated }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex-shrink-0">
          <Link to="/" className="text-white font-bold text-xl">
            Logo
          </Link>
        </div>
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
        <div
          className={`md:flex md:items-center md:w-auto ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <ul className="md:flex md:space-x-4 md:text-white md:text-xl">
            <li>
              <Link to="/" className="block md:inline-block mt-4 md:mt-0">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="block md:inline-block mt-4 md:mt-0">
                About
              </Link>
            </li>
            <li>
              <Link
                to="/services"
                className="block md:inline-block mt-4 md:mt-0"
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="block md:inline-block mt-4 md:mt-0"
              >
                Contact
              </Link>
            </li>
            <li>
              <Link to="/login" className="flex items-center mt-4 md:mt-0">
                <svg
                  className="h-6 w-6 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                {authenticated ? "Profil" : "Login"}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
