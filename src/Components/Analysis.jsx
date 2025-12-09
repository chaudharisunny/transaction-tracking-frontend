import React, { useEffect, useState } from "react";
import PiChart from "./PiChart";
import axios from "axios";

function Analysis() {
  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
  });

  const [transactions, setTransactions] = useState([]);
  const [activeTab, setActiveTab] = useState("expense"); // default tab

  useEffect(() => {
    fetchSummary();
    fetchTransactions();
  }, []);

  const fetchSummary = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:3000/summary", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = res.data.data || res.data;
      setSummary({
        totalIncome: data.totalIncome,
        totalExpense: data.totalExpense,
        balance: data.balance,
      });
    } catch (err) {
      console.log("Error fetching summary", err);
    }
  };

  const fetchTransactions = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:3000/transaction/all", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setTransactions(res.data.data || res.data);
    } catch (err) {
      console.log("Error fetching transactions", err);
    }
  };

  const expenseList = transactions.filter(t => t.transactionType === "expense");
  const incomeList = transactions.filter(t => t.transactionType === "income");

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Finance Analysis</h1>

      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        {["expense", "income", "account"].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-md font-medium ${
              activeTab === tab ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"
            }`}
          >
            {tab === "expense" ? "Expense Overview" : tab === "income" ? "Income Overview" : "Account Analysis"}
          </button>
        ))}
      </div>

      {/* Chart */}
      <div className="bg-white shadow-lg rounded-lg p-4 mb-6 flex justify-center">
        {activeTab === "expense" && <PiChart income={0} expense={summary.totalExpense} />}
        {activeTab === "income" && <PiChart income={summary.totalIncome} expense={0} />}
        {activeTab === "account" && <PiChart income={summary.totalIncome} expense={summary.totalExpense} />}
      </div>

      {/* Content */}
      {activeTab === "expense" && <TransactionTable title="Expense List" list={expenseList} />}
      {activeTab === "income" && <TransactionTable title="Income List" list={incomeList} />}
      {activeTab === "account" && (
        <div className="bg-white shadow-lg rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-2">Account Summary</h2>
          <p>Total Income: ₹{summary.totalIncome}</p>
          <p>Total Expense: ₹{summary.totalExpense}</p>
          <p className="font-bold mt-1">Available Balance: ₹{summary.balance}</p>
        </div>
      )}
    </div>
  );
}

export default Analysis;

// Transaction Table Component
const TransactionTable = ({ title, list }) => (
  <div className="bg-white shadow-md rounded-lg p-4 mt-4">
    <h2 className="text-lg font-bold mb-3">{title}</h2>
    {list.length === 0 ? (
      <p className="text-gray-500 text-center">No data available</p>
    ) : (
      <table className="w-full border-collapse">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 text-left">Item</th>
            <th className="p-2 text-left">Category</th>
            <th className="p-2 text-left">Amount</th>
            <th className="p-2 text-left">Date</th>
          </tr>
        </thead>
        <tbody>
          {list.map((t, i) => (
            <tr key={i} className="border-b hover:bg-gray-100">
              <td className="p-2">{t.item}</td>
              <td className="p-2">{t.category}</td>
              <td className="p-2">₹{t.amount}</td>
              <td className="p-2">{new Date(t.date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </div>
);
