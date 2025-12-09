import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser && storedUser !== "undefined") {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Failed to parse user from localStorage:', error);
      setUser(null);
    }
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <div className="w-full h-[60px] bg-white shadow-md flex items-center justify-between px-6 relative">
      <h1 className="text-xl font-bold text-blue-600">Finance App</h1>

      <div className="relative" ref={dropdownRef}>
        <div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          <h2 className="text-md font-medium text-gray-700">
            {user?.username || "Guest"}
          </h2>
        </div>

        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-50">
            <ul className="text-sm text-gray-700">
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                Edit Profile
              </li>
              <li
                onClick={handleLogout}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                Logout
              </li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                <a href="/register">New Account</a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
