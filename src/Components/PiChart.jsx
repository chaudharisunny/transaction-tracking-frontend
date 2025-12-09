import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

function PiChart({ income, expense }) {
  const data = [
    { name: "Income", value: Number(income) || 0 },
    { name: "Expense", value: Number(expense) || 0 }
  ];

  const COLORS = ["#4CAF50", "#F44336"]; // Green Income / Red Expense

  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={100}
            dataKey="value"
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>

          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default PiChart;
