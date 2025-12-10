import React, { useEffect, useState } from "react";
import api from "../api";

function Dashboard() {
 
  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
  });

  const [recent, setRecent] = useState([]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const res = await api.get("/transaction/all", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = res.data.data || [];
      

      const income = data
        .filter((t) => t.transactionType === "income")
        .reduce((sum, t) => sum + Number(t.amount), 0);

      const expense = data
        .filter((t) => t.transactionType === "expense")
        .reduce((sum, t) => sum + Number(t.amount), 0);

      setSummary({
        totalIncome: income,
        totalExpense: expense,
        balance: income - expense,
      });

      setRecent(data.slice(-5).reverse());
    } catch (err) {
      console.error("Failed to fetch transactions", err);
    }
  };

  return (
    <div className="p-4 space-y-6">

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-green-600 text-white p-4 rounded-xl shadow-lg">
          <h3 className="text-lg font-bold">Total Income</h3>
          <p className="text-3xl font-extrabold mt-2">₹{summary.totalIncome}</p>
        </div>

        <div className="bg-red-600 text-white p-4 rounded-xl shadow-lg">
          <h3 className="text-lg font-bold">Total Expense</h3>
          <p className="text-3xl font-extrabold mt-2">₹{summary.totalExpense}</p>
        </div>

        <div className="bg-blue-700 text-white p-4 rounded-xl shadow-lg">
          <h3 className="text-lg font-bold">Available Balance</h3>
          <p className="text-3xl font-extrabold mt-2">₹{summary.balance}</p>
        </div>
      </div>

      {/* Latest Transactions */}
      <div className="bg-white rounded-xl shadow p-4 overflow-x-auto w-full">
        <h4 className="text-xl font-bold mb-4">Latest Transactions</h4>
        <table className="table-auto w-full text-sm">
          <thead className="text-gray-600 font-semibold">
            <tr>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Item</th>
              <th className="px-4 py-2 text-left">Type</th>
              <th className="px-4 py-2 text-left">Category</th>
              <th className="px-4 py-2 text-left">Amount</th>
            </tr>
          </thead>
          <tbody>
            {recent.length > 0 ? (
              recent.map((tx, index) => (
                <tr key={index} className="border-t hover:bg-gray-100 duration-200">
                  <td className="px-4 py-3 text-left">{new Date(tx.date).toLocaleDateString()}</td>
                  <td className="px-4 py-3 text-left">{tx.item}</td>
                  <td className="px-4 py-3 text-left capitalize">{tx.transactionType}</td>
                  <td className="px-4 py-3 text-left">{tx.category}</td>
                  <td className="px-4 py-3 text-left font-semibold">
                    {tx.transactionType === "expense" ? (
                      <span className="text-red-600">-₹{tx.amount}</span>
                    ) : (
                      <span className="text-green-600">+₹{tx.amount}</span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-3">No recent transactions</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;
