import { FileText, Menu, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProfileDropdown from "../layout/ProfileDropdown";
import Button from "../ui/Button";
import { useAuth } from "../../context/AuthContext";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { isAuthenticated, user, logout } = useAuth();

  const navigate = useNavigate();

  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 bg-gray-100 ${isScrolled ? "bg-white/95 backdrop-blur-sm shadow-lg" : "bg-white/0"}`}>
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex justify-between items-center h-16 lg:h-20">
          <div className="flex items-center space-x-2">
            <div className="flex justify-center items-center bg-blue-900 rounded-md w-8 h-8">
              <FileText className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-gray-900 text-xl">BillWise</span>
          </div>
          <div className="hidden lg:flex lg:items-center lg:space-x-8">
            <a
              href="#features"
              className="after:bottom-0 after:left-0 after:absolute relative after:bg-black after:w-0 hover:after:w-full after:h-0.5 font-medium text-gray-600 hover:text-gray-900 transition-colors after:transition-all duration-200">
              Features
            </a>
            <a
              href="#testimonials"
              className="after:bottom-0 after:left-0 after:absolute relative after:bg-black after:w-0 hover:after:w-full after:h-0.5 font-medium text-gray-600 hover:text-gray-900 transition-colors after:transition-all duration-200">
              Testimonials
            </a>
            <a
              href="#faq"
              className="after:bottom-0 after:left-0 after:absolute relative after:bg-black after:w-0 hover:after:w-full after:h-0.5 font-medium text-gray-600 hover:text-gray-900 transition-colors after:transition-all duration-200">
              FAQ
            </a>
          </div>
          <div className="hidden lg:flex items-center space-x-4">
            {!isAuthenticated ? (
              <>
                <Link
                  to="/login"
                  className="font-medium text-black hover:text-gray-900 transition-colors duration-200">
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="hover:bg-gray-800 bg-gradient-to-r from-blue-950 to-blue-900 hover:shadow-lg px-6 py-2.5 rounded-lg font-medium text-white hover:scale-105 transition-all duration-200">
                  Sign Up
                </Link>
              </>
            ) : (
              <ProfileDropdown
                isOpen={profileDropdownOpen}
                onToggle={(e) => {
                  e.stopPropagation();
                  setProfileDropdownOpen((prev) => !prev);
                }}
                avatar={user?.avatar || ""}
                companyName={user?.name || ""}
                email={user?.email || ""}
                onLogout={logout}
              />
            )}
          </div>
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="hover:bg-gray-100 p-2 rounded-lg text-gray-600 hover:text-gray-900 transition-colors duration-200">
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden top-full right-0 left-0 absolute bg-white shadow-lg border-gray-2 border-b">
          <div className="space-y-1 sm:p-3 px-2 pb-3">
            <a
              href="#features"
              className="block hover:bg-gray-50 px-4 py-3 font-medium text-gray-600 hover:text-gray-900 transition-colors duration-200">
              Features
            </a>
            <a
              href="#testimonials"
              className="block hover:bg-gray-50 px-4 py-3 font-medium text-gray-600 hover:text-gray-900 transition-colors duration-200">
              Testimonials
            </a>
            <a
              href="#faq"
              className="block hover:bg-gray-50 px-4 py-3 font-medium text-gray-600 hover:text-gray-900 transition-colors duration-200">
              FAQ
            </a>
            <div className="my-2 border-gray-200 border-t"></div>
            {isAuthenticated ? (
              <div className="p-4">
                <Button
                  onClick={() => navigate("/dashboard")}
                  className="w-full">
                  Go to Dashboard
                </Button>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block hover:bg-gray-50 px-4 py-3 font-medium text-gray-600 hover:text-gray-900 transition-colors duration-200">
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="block bg-gray-900 hover:bg-gray-800 px-4 py-3 rounded-lg w-full font-medium text-white text-left transition-all duration-200">
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
