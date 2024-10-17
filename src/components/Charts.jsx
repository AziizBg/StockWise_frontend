import { useEffect } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    CartesianGrid,
    ResponsiveContainer,
  } from "recharts";

export default function Charts({chartData, salePrice, purchasePrice}) {

    useEffect(() => {
        console.log("Chart Data: ", chartData);
    }
    , [chartData]);


  return (
    <div className="container col-8">
      <h1>Stock Simulation Charts</h1>
      {/* Chart 1: Forecast Sales */}
      <h2>Forecast Sales</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="actual_date"
            label={{
              value: "Date",
              position: "insideBottomRight",
              offset: -5,
            }}
          />
          <YAxis
            label={{
              value: "Quantity Ordered",
              angle: -90,
              position: "insideLeft",
            }}
          />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="quantityOrdered"
            stroke="#8884d8"
            name="Quantity Ordered"
          />
        </LineChart>
      </ResponsiveContainer>
      {/* Chart 2: Forecast Supply Planning */}
      <h2>Forecast Supply Planning</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="actual_date"
            label={{
              value: "Date",
              position: "insideBottomRight",
              offset: -5,
            }}
          />
          <YAxis
            label={{
              value: "Cumulative Supply",
              angle: -90,
              position: "insideLeft",
            }}
          />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="cumulativeSupply"
            stroke="#82ca9d"
            name="Cumulative Supply"
          />
        </LineChart>
      </ResponsiveContainer>
      {/* Chart 3: Stock Price Dynamics */}
      <h2>Stock Price Dynamics</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="actual_date"
            label={{
              value: "Date",
              position: "insideBottomRight",
              offset: -5,
            }}
          />
          <YAxis
            label={{
              value: "Stock Price",
              angle: -90,
              position: "insideLeft",
            }}
          />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="stockPrice"
            stroke="#8884d8"
            name="Stock Price"
          />
          <Line
            type="monotone"
            dataKey={() => salePrice}
            stroke="blue"
            name="Unit Sale Price"
            strokeDasharray="5 5"
          />
          <Line
            type="monotone"
            dataKey={() => purchasePrice}
            stroke="green"
            name="Unit Purchase Price"
            strokeDasharray="5 5"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
