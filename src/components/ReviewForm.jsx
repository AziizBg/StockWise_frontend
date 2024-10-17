import React, { useState } from "react";

const ReviewForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    u_price: 50,
    u_sale: 100,
    benefit_rate: 0.2,
    expences_F: 10000,
  });

  const labels = {
    u_price: "Unit Purchase Price",
    u_sale: "Unit Sale Price",
    benefit_rate: "Benefit Rate",
    expences_F: "Fixed Expenses",
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
      console.log("Submitting review data...", formData);
      onSubmit(formData); // Call the onSubmit prop
    } catch (error) {
      console.error("Error submitting review data!", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-group">
      <h1>Stock Review Input</h1>
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
        Review
      </button>
    </form>
  );
};

export default ReviewForm;
