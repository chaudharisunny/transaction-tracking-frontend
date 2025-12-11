import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function AllAccounts() {
  const [accounts, setAccounts] = useState([]);

  // Fetch all accounts
  const fetchAccounts = async () => {
    try {
      const res = await axios.get("http://localhost:3000/allaccount", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setAccounts(res.data.data || []);
    } catch (error) {
      console.error("Failed to load accounts", error);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  // Delete Account
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this account?")) return;

    try {
      await axios.delete(`http://localhost:3000/deleteaccount/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      fetchAccounts(); // Refresh list
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  return (
    <div className="p-6">
      {/* Top Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">All Accounts</h2>

        <Link
          to="/account/add"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition font-semibold"
        >
          + Add Account
        </Link>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow p-4 overflow-x-auto">
        <table className="table-auto w-full text-sm">
          <thead className="text-gray-600 font-semibold">
            <tr>
              <th className="px-4 py-2 text-left">Account Name</th>
              <th className="px-4 py-2 text-left">Amount</th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {accounts.length > 0 ? (
              accounts.map((acc) => (
                <tr key={acc._id} className="border-t hover:bg-gray-100">
                  <td className="px-4 py-3">{acc.name}</td>
                  <td className="px-4 py-3 font-semibold">₹{acc.amount}</td>
                  <td className="px-4 py-3 text-center space-x-3">
                    <Link
                      to={`/updateaccount/${acc._id}`}
                      className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(acc._id)}
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center py-4">
                  No accounts found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AllAccounts;
