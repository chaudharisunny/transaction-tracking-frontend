import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function UpdateTransaction() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    date: '',
    item: '',
    payment: '',
    transactionType: '',
    category: '',
    amount: ''
  });

  const incomeCategories = ['Salary', 'Bonus', 'Investment', 'Freelance'];
  const expenseCategories = ['Food', 'Transport', 'Shopping', 'Bills'];

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/allTransaction`);
        const transaction = res.data.transactions.find(t => t._id === id);
        if (transaction) {
          setFormData(transaction);
        } else {
          alert("Transaction not found");
        }
      } catch (error) {
        console.error("Error fetching transaction:", error);
      }
    };

    fetchTransaction();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/updateTransaction/${id}`, formData);
      alert("Transaction updated successfully!");
      navigate('/view-all'); // or your route for viewing transactions
    } catch (error) {
      console.error("Error updating transaction:", error);
      alert("Failed to update transaction");
    }
  };

  return (
    <div className="flex justify-center mt-10 px-4">
      <div className="w-full max-w-xl bg-gray-100 rounded-lg p-6 shadow-lg">
        <h1 className="text-2xl font-bold mb-6">Update Transaction</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="date"
            name="date"
            value={formData.date?.substring(0, 10)}
            onChange={handleChange}
            className="w-full h-10 pl-3 rounded bg-white"
          />

          <input
            type="text"
            name="item"
            placeholder="Item Name"
            value={formData.item}
            onChange={handleChange}
            className="w-full h-10 pl-3 rounded bg-white"
          />

          <select
            name="payment"
            value={formData.payment}
            onChange={handleChange}
            className="w-full h-10 pl-3 rounded bg-white"
          >
            <option value="">Type of Amount</option>
            <option value="Cash">Cash Amount</option>
            <option value="Card">Card Amount</option>
            <option value="Online">Online Amount</option>
          </select>

          <select
            name="transactionType"
            value={formData.transactionType}
            onChange={handleChange}
            className="w-full h-10 pl-3 rounded bg-white"
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
            >
              <option value="">Select Category</option>
              {(formData.transactionType === "income" ? incomeCategories : expenseCategories).map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
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
          />

          <button
            type="submit"
            className="w-full h-10 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded"
          >
            Update Transaction
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateTransaction;
