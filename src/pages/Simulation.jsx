// src/Simulation.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import SimulationForm from "../components/SimulationForm"; // Import the new form component

import Charts from "../components/Charts";

function getDate(number, start_date) {
  try {
    const date = new Date(start_date);
    date.setDate(start_date.getDate() + number);
    return date.toISOString().split("T")[0];
  } catch (e) {
    console.log(e);
    console.log("start_date", start_date);
  }
}

const Simulation = () => {
  const [simulationData, setSimulationData] = useState(null);
  const [salePrice, setSalePrice] = useState(50);
  const [purchasePrice, setPurchasePrice] = useState(100);
  const [start_date, setStartDate] = useState(new Date());

  // Handle form submission
  const handleFormSubmit = async (data) => {
    try {
      console.log("Submitting simulation data...", data);
      setPurchasePrice(data.u_price);
      setSalePrice(data.u_sale);
      setStartDate(new Date(data.start_date));
      const response = await axios.post(
        "http://127.0.0.1:5000/api/simulation",
        data
      );
      const { dates, stock_price, quantity_ordered, cumulative_supply } =
        response.data;

      // Create data structure for Recharts
      setSimulationData(
        dates.map((date, index) => ({
          date: date,
          actual_date: getDate(date, start_date),
          stockPrice: stock_price[index],
          quantityOrdered: quantity_ordered[index],
          cumulativeSupply: cumulative_supply[index],
        }))
      );
      console.log("Simulation submitted successfully!", simulationData);
    } catch (error) {
      console.error("Error submitting simulation data!", error);
    }

    // if (!simulationData) {
    //   return <div>Loading...</div>;
    // }
  };

  return (
    <div className="d-flex flex-row  gap-3 w-100">
      <div className={`container ${simulationData && "col-3"}`}>
        <SimulationForm onSubmit={handleFormSubmit} />{" "}
      </div>
      {/* Include the form here */}
      {simulationData && (
        <Charts
          chartData={simulationData}
          start_date={start_date}
          salePrice={salePrice}
          purchasePrice={purchasePrice}
        />
      )}
    </div>
  );
};

export default Simulation;
