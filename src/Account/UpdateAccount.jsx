import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const UpdateAccount = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    name: "",
    amount: ""
  });

  // Fetch old account data
  const fetchAccount = useCallback(async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/geteditacc/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setFormData({
        name: res.data.data.name,
        amount: res.data.data.amount
      });
    } catch (error) {
      console.log(error);
    }
  }, [id, token]); // dependencies

  useEffect(() => {
    fetchAccount();
  }, [fetchAccount]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:3000/updateaccount/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Account Updated Successfully");
      navigate("/allaccount");
    } catch (error) {
      console.log(error);
      alert("Failed to update account");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <div className="bg-white p-5 rounded shadow-lg w-[350px]">
        <h2 className="text-2xl font-semibold mb-4 text-center">Update Account</h2>

        <form onSubmit={handleUpdate}>
          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            className="w-full p-2 border rounded mb-3 outline-none"
            value={formData.name}
            onChange={handleChange}
          />

          <input
            type="number"
            name="amount"
            placeholder="Enter Amount"
            className="w-full p-2 border rounded mb-3 outline-none"
            value={formData.amount}
            onChange={handleChange}
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
          >
            Update Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateAccount;
