import React, { useState } from "react";
import axios from "axios";
import Graph from "./components/Graph";
import Table from "./components/Table";

function App() {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeatherData = async () => {
    if (!latitude || !longitude || !startDate || !endDate) {
      setError("All fields are required");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const response = await axios.get(`http://localhost:5000/weather`, {
        params: { latitude, longitude, startDate, endDate },
      });
      setWeatherData(response.data);
    } catch (error) {
      setError("Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 gap-4">
        <input
          type="number"
          placeholder="Latitude"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
        />
        <input
          type="number"
          placeholder="Longitude"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
        />
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <button onClick={fetchWeatherData} className="bg-blue-500 text-white">
          Fetch Weather
        </button>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {weatherData && (
        <>
          <Graph data={weatherData} />
          <Table data={weatherData} />
        </>
      )}
    </div>
  );
}

export default App;
