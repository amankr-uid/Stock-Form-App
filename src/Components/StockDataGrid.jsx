import React from "react";

// Simple loader component
const Loader = () => <div className="loader"></div>;

const StockDataGrid = ({ stockData, loading }) => {
  if (loading) {
    return <Loader />;
  }

  return (
    <div className="stockDataWrap">
      {stockData.length > 0 ? (
        <table border="1" style={{ width: "100%", marginTop: "20px" }}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Open</th>
              <th>High</th>
              <th>Low</th>
              <th>Close</th>
              <th>Volume</th>
            </tr>
          </thead>
          <tbody>
            {stockData.map((data, index) => (
              <tr key={index}>
                <td>{data.date}</td>
                <td>{data["1. open"]}</td>
                <td>{data["2. high"]}</td>
                <td>{data["3. low"]}</td>
                <td>{data["4. close"]}</td>
                <td>{data["5. volume"]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Select a country...</p>
      )}
    </div>
  );
};

export default StockDataGrid;
