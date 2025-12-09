import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);

  return (
    <div className="min-h-screen w-64 bg-blue-600 text-white p-6 shadow-lg">
      <h3 className="text-2xl font-bold mb-8">Finance App</h3>

      <ul className="space-y-3">

        {/* Dashboard */}
        <li>
          <Link
            to="/dashboard"
            className="block px-4 py-2 rounded bg-white text-blue-600 font-semibold hover:bg-blue-100 transition"
          >
            Dashboard
          </Link>
        </li>

        {/* Analysis Page */}
        <li>
          <Link
            to="/analysis"
            className="block px-4 py-2 rounded hover:bg-blue-700 font-semibold"
          >
            Analysis
          </Link>
        </li>

        {/* Transactions Dropdown */}
        <li>
          <div
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex justify-between items-center px-4 py-2 rounded hover:bg-blue-700 cursor-pointer font-semibold"
          >
            <span>Transactions</span>
            <span>{showDropdown ? '▲' : '▼'}</span>
          </div>

          {showDropdown && (
            <ul className="ml-4 mt-2 space-y-2 text-sm font-medium">
              <li>
                <Link
                  to="/transaction/add"
                  className="block px-3 py-1 rounded bg-white text-blue-600 hover:bg-blue-100 transition"
                >
                  Add Transaction
                </Link>
              </li>

              <li>
                <Link
                  to="/transaction/all"
                  className="block px-3 py-1 rounded bg-white text-blue-600 hover:bg-blue-100 transition"
                >
                  All Transactions
                </Link>
              </li>
            </ul>
          )}
        </li>

        {/* Accounts Dropdown */}
        <li>
          <div
            onClick={() => setShowAccountDropdown(!showAccountDropdown)}
            className="flex justify-between items-center px-4 py-2 rounded hover:bg-blue-700 cursor-pointer font-semibold"
          >
            <span>Accounts</span>
            <span>{showAccountDropdown ? '▲' : '▼'}</span>
          </div>

          {showAccountDropdown && (
            <ul className="ml-4 mt-2 space-y-2 text-sm font-medium">
              <li>
                <Link
                  to="/addaccount"
                  className="block px-3 py-1 rounded bg-white text-blue-600 hover:bg-blue-100 transition"
                >
                  Add Account
                </Link>
              </li>

              <li>
                <Link
                  to="/allaccount"
                  className="block px-3 py-1 rounded bg-white text-blue-600 hover:bg-blue-100 transition"
                >
                  All Accounts
                </Link>
              </li>
            </ul>
          )}
        </li>

        {/* Settings */}
        <li>
          <button className="w-full text-left px-4 py-2 rounded hover:bg-blue-700 font-semibold">
            Settings
          </button>
        </li>

        {/* Logout */}
        <li>
          <Link
            to="/admin"
            className="w-full text-left px-4 py-2 rounded hover:bg-blue-700 font-semibold"
          >
            Logout
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
