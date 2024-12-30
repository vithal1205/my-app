import React from "react";

function Table({ data }) {
  if (!data.time) return null;

  const rowsPerPage = 10;
  const totalPages = Math.ceil(data.time.length / rowsPerPage);
  const [page, setPage] = React.useState(1);

  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  const currentData = data.time.slice(startIndex, endIndex).map((_, index) => ({
    date: data.time[startIndex + index],
    maxTemp: data.temperature_2m_max[startIndex + index],
    minTemp: data.temperature_2m_min[startIndex + index],
    meanTemp: data.temperature_2m_mean[startIndex + index],
  }));

  return (
    <div>
      <table className="table-auto w-full border">
        <thead>
          <tr>
            <th>Date</th>
            <th>Max Temp</th>
            <th>Min Temp</th>
            <th>Mean Temp</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((row, idx) => (
            <tr key={idx}>
              <td>{row.date}</td>
              <td>{row.maxTemp}°C</td>
              <td>{row.minTemp}°C</td>
              <td>{row.meanTemp}°C</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between mt-4">
        <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))}>
          Previous
        </button>
        <p>
          Page {page} of {totalPages}
        </p>
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Table;
