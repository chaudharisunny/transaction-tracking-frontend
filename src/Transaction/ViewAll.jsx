import React, { useEffect, useState } from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import api from '../api';

function ViewAll() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem("token");
        const user = JSON.parse(localStorage.getItem("user"));

        if (!user) {
          alert("User not logged in");
          return;
        }

        const res = await api.get("/transaction/all", {
  headers: { Authorization: `Bearer ${token}` }
});

        setTransactions(res.data.data || []);
      } catch (error) {
        console.error("Error fetching transactions:", error.message);
        alert("Failed to load transactions");
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this transaction?")) return;

    try {
      const token = localStorage.getItem("token");

      await api.delete(`/deleteTransaction/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setTransactions((prev) => prev.filter((txn) => txn._id !== id));
    } catch (error) {
      console.error("Error deleting transaction:", error.message);
      alert("Failed to delete transaction");
    }
  };

  const handleEdit = (id) => {
    navigate(`/update/${id}`);
  };

  if (loading) {
    return <h2 className="text-center text-xl mt-10">Loading...</h2>;
  }

  return (
    <div className="mx-auto mt-10 w-10/12 bg-white p-6 shadow-lg rounded-lg">
      <h3 className="text-2xl font-bold mb-6 text-center">All Transactions</h3>

      <table className="w-full text-left shadow-md rounded-md overflow-hidden">
        <thead>
          <tr className="bg-gray-200 text-lg">
            <th className="px-4 py-3">Date</th>
            <th className="px-4 py-3">Item Name</th>
            <th className="px-4 py-3">Payment</th>
            <th className="px-4 py-3">Category</th>
            <th className="px-4 py-3">Amount</th>
            <th className="px-4 py-3 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {transactions.length > 0 ? (
            transactions.map((tx) => (
              <tr key={tx._id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">{tx.date?.slice(0, 10)}</td>
                <td className="px-4 py-3">{tx.item}</td>
                <td className="px-4 py-3">{tx.payment}</td>
                <td className="px-4 py-3">{tx.category}</td>
                <td className="px-4 py-3 font-semibold">{tx.amount}</td>

                <td className="px-4 py-3 flex justify-center gap-4">
                  <button onClick={() => handleEdit(tx._id)}>
                    <FaEdit className="text-green-600 text-xl" />
                  </button>
                  <button onClick={() => handleDelete(tx._id)}>
                    <FaTrash className="text-red-600 text-xl" />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="px-4 py-4 text-center" colSpan="6">
                No transactions found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ViewAll;
