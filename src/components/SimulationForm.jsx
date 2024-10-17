import React, { useState } from "react";

const SimulationForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    u_price: 50,
    u_sale: 100,
    benefit_rate: 0.2,
    expences_F: 10000,
    delay_supply: 5,
    stock_rate: 0.2,
    order_n: 50,
    order_f: 4,
    due_date: 60,
    order_q: 100,
    order_fluc: 5,
    start_date: new Date().toISOString().split("T")[0],
  });

  const labels = {
    u_price: "Unit Purchase Price",
    u_sale: "Unit Sale Price",
    benefit_rate: "Benefit Rate",
    expences_F: "Fixed Expenses",
    delay_supply: "Supply Delay in Days",
    stock_rate: "Stock Rate",
    order_n: "Number of Orders",
    order_f: "Expected order frequency",
    due_date: "Plan's Duration (days)",
    order_q: "Order Mean Quantity",
    order_fluc: "Order Fluctuation",
    start_date: "Start Date",
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "start_date") {
      setFormData({ ...formData, [name]: value });
    } else {
      setFormData({ ...formData, [name]: parseFloat(value) });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Submitting simulation data...", formData);
      onSubmit(formData); // Call the onSubmit prop to update the simulation data in the parent
    } catch (error) {
      console.error("Error submitting simulation data!", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-group">
      <h1>Stock Simulation Input</h1>
      {Object.keys(formData).map((key) => (
        <div key={key}>
          <label className="form-label">
            {labels[key]}:
            <input
              type={key === "start_date" ? "date" : "number"}
              className="form-control"
              name={key}
              value={formData[key]}
              onChange={handleChange}
            />
          </label>
        </div>
      ))}
      <button type="submit" className="btn btn-outline-success mb-3">
        Run Simulation
      </button>
    </form>
  );
};

export default SimulationForm;
