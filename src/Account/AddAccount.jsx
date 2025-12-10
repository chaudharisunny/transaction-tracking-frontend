import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

function AddAccount() {
  const [form, setForm] = useState({
    name: "",
    amount: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.amount) {
      return setError("All fields are required");
    }

    try {
        await api.post(
        "/newaccount",
        form,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setSuccess("Account added successfully!");
      setError("");

      setTimeout(() => navigate("/accounts"), 1200);
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-6 mt-10">
      <h2 className="text-2xl font-bold text-center mb-6">Add New Account</h2>

      {error && <p className="text-red-600 mb-2">{error}</p>}
      {success && <p className="text-green-600 mb-2">{success}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Account Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="card,cash,saving,online..."
            value={form.name}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Amount
          </label>
          <input
            type="number"
            name="amount"
            placeholder="Enter available amount"
            value={form.amount}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded-lg font-bold hover:bg-blue-700 transition"
        >
          Add Account
        </button>
      </form>
    </div>
  );
}

export default AddAccount;
