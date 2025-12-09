import React, { useState, useEffect } from "react";
import axios from "axios";

function AddTransaction() {
  const [formData, setFormData] = useState({
    date: "",
    item: "",
    payment: "",
    transactionType: "",
    category: "",
    amount: "",
  });

  const [accounts, setAccounts] = useState([]); // NEW STATE FOR ACCOUNT LIST

  const incomeCategories = ["Salary", "Bonus", "Investment", "Freelance"];
  const expenseCategories = ["Food", "Transport", "Shopping", "Bills"];

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      const res = await axios.get("http://localhost:3000/allaccount", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setAccounts(res.data.data || []);
    } catch (err) {
      console.error("Failed to fetch accounts", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("You are not logged in. Please login first.");
      return;
    }

    try {
      await axios.post("http://localhost:3000/addTransaction", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Transaction added successfully!");

      setFormData({
        date: "",
        item: "",
        payment: "",
        transactionType: "",
        category: "",
        amount: "",
      });

      window.location.href = "/transaction/all";
    } catch (error) {
      console.error("Error adding transaction:", error.response || error);

      if (error.response?.status === 401) {
        alert("Unauthorized! Please login again.");
        window.location.href = "/login";
      } else {
        alert(error.response?.data?.message || "Failed to add transaction");
      }
    }
  };

  return (
    <div className="flex justify-center mt-10 px-4">
      <div className="w-full max-w-xl bg-gray-700 rounded-lg p-6 shadow-lg">
        <h1 className="text-2xl font-bold text-white mb-6">New Transaction</h1>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full h-10 pl-3 rounded bg-white"
            required
          />

          <input
            type="text"
            name="item"
            placeholder="Item Name"
            value={formData.item}
            onChange={handleChange}
            className="w-full h-10 pl-3 rounded bg-white"
            required
          />

          {/* FETCH ACCOUNTS IN THIS DROPDOWN */}
          <select
            name="payment"
            value={formData.payment}
            onChange={handleChange}
            className="w-full h-10 pl-3 rounded bg-white"
            required
          >
            <option value="">Select Account</option>
            {accounts.map((acc) => (
              <option key={acc._id} value={acc.name}>
                {acc.name} 
              </option>
            ))}
          </select>

          <select
            name="transactionType"
            value={formData.transactionType}
            onChange={handleChange}
            className="w-full h-10 pl-3 rounded bg-white"
            required
          >
            <option value="">Select Type</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>

          {formData.transactionType && (
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full h-10 pl-3 rounded bg-white"
              required
            >
              <option value="">Select Category</option>
              {(formData.transactionType === "income"
                ? incomeCategories
                : expenseCategories
              ).map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          )}

          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={formData.amount}
            onChange={handleChange}
            className="w-full h-10 pl-3 rounded bg-white"
            required
          />

          <button
            type="submit"
            className="w-full h-10 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded"
          >
            Add Transaction
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddTransaction;
