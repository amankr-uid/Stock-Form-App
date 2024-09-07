import React, { useState } from "react";
import axios from "axios";
import StockDataGrid from "./StockDataGrid";

const StockAPISelector = () => {
  const [country, setCountry] = useState("");
  const [stockData, setStockData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);  // New loading state

  // Define API endpoints for different countries
  const stockAPIs = {
    "United States": "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=demo",
    "United Kingdom": "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=TSCO.LON&outputsize=full&apikey=demo",
    "Canada": "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=SHOP.TRT&outputsize=full&apikey=demo",
    "Canada Venture": "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=GPV.TRV&outputsize=full&apikey=demo",
    "Germany": "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=MBG.DEX&outputsize=full&apikey=demo",
    "India": "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=RELIANCE.BSE&outputsize=full&apikey=demo",
    "China Shanghai": "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=600104.SHH&outputsize=full&apikey=demo",
    "China Shenzhen": "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=000002.SHZ&outputsize=full&apikey=demo",
  };

  // Handle form submit to fetch data
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!country) {
      setError("Please select a country");
      return;
    }

    const apiUrl = stockAPIs[country];

    setLoading(true); // Start loading
    setError("");     // Clear previous errors

    try {
      const response = await axios.get(apiUrl);
      const timeSeries = response.data["Time Series (Daily)"];

      if (!timeSeries) {
        setError("No data available for the selected country");
        setStockData([]);
      } else {
        const formattedData = Object.keys(timeSeries).map((date) => ({
          date,
          ...timeSeries[date],
        }));
        setStockData(formattedData);
      }
    } catch (err) {
      setError("Error fetching data");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="formWrap">
      <h1>Stock Data by Country</h1>

      {/* Form to select a country */}
      <form onSubmit={handleSubmit}>
        <select value={country} onChange={(e) => setCountry(e.target.value)} required title="Select a country">
          <option value="">Select a country</option>
          <option value="United States">United States</option>
          <option value="United Kingdom">United Kingdom</option>
          <option value="Canada">Canada</option>
          <option value="Canada Venture">Canada - Venture</option>
          <option value="Germany">Germany</option>
          <option value="India">India</option>
          <option value="China Shanghai">China - Shanghai Stock Exchange</option>
          <option value="China Shenzhen">China - Shenzhen Stock Exchange</option>
        </select>
        <button type="submit" title="Get Stock Data">Get Stock Data</button>
      </form>

      {/* Display error if any */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Pass stock data and loading state to the grid component */}
      <StockDataGrid stockData={stockData} loading={loading} />
    </div>
  );
};

export default StockAPISelector;