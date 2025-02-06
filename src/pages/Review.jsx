// src/Review.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import Charts from "../components/Charts";
import ReviewForm from "../components/ReviewForm";
import { environment } from "../environment";



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

const Review = () => {
  const [data, setData] = useState(null);
  const [salePrice, setSalePrice] = useState(50);
  const [purchasePrice, setPurchasePrice] = useState(100);
  const [start, setStart] = useState();

  // Handle form submission
  const handleFormSubmit = async (data) => {
    try {
      // console.log("Submitting review data...", data);
      setPurchasePrice(data.u_price);
      setSalePrice(data.u_sale);
      const response = await axios.post(
        environment.production.api_url, data
      );
      console.log("response", response);
      
      const {start_date, dates, stock_price, quantity_ordered, cumulative_supply } =response.data;
      console.log("s_date", start_date);
      console.log("date object", new Date(start_date));
      setStart(new Date(start_date));

      // Create data structure for Recharts
      setData(
        dates.map((date, index) => ({
          date: date,
          actual_date: getDate(date, new Date(start_date)),
          stockPrice: stock_price[index],
          quantityOrdered: quantity_ordered[index],
          cumulativeSupply: cumulative_supply[index],
        }))
      );
    } catch (error) {
      console.error("Error submitting Review data!", error);
    }
  };

  return (
    <div className="d-flex flex-row  gap-3 w-100">
      <div className={`container ${data && "col-3"}`}>
        <ReviewForm onSubmit={handleFormSubmit}  />{" "}
      </div>
      {data && (
        <Charts
          
          chartData={data}
          start_date={start}
          salePrice={salePrice}
          purchasePrice={purchasePrice}
        />
      )}
    </div>
  );
};

export default Review;
