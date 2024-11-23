import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ComparePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;
  const selectedAirlines = state?.selectedAirlines || [];

  if (!selectedAirlines.length) {
    return (
      <div className="text-center mt-8">
        <h2 className="text-2xl font-bold">No airlines selected for comparison.</h2>
        <button
          onClick={() => navigate("/")}
          className="bg-blue-500 text-white py-2 px-6 rounded-lg mt-4"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="compare-page text-center py-8">
      <h1 className="text-4xl font-bold mb-8">Compare Airlines</h1>
      <table className="table-auto mx-auto text-left border-collapse">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Attribute</th>
            {selectedAirlines.map((airline) => (
              <th key={airline.id} className="px-4 py-2 border">
                {airline.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="px-4 py-2 border">Fleet Size</td>
            {selectedAirlines.map((airline) => (
              <td key={airline.id} className="px-4 py-2 border">
                {airline.fleetSize}
              </td>
            ))}
          </tr>
          <tr>
            <td className="px-4 py-2 border">Countries Served</td>
            {selectedAirlines.map((airline) => (
              <td key={airline.id} className="px-4 py-2 border">
                {airline.countriesServed}
              </td>
            ))}
          </tr>
          <tr>
            <td className="px-4 py-2 border">Destinations Served</td>
            {selectedAirlines.map((airline) => (
              <td key={airline.id} className="px-4 py-2 border">
                {airline.destinations.length}
              </td>
            ))}
          </tr>
          <tr>
            <td className="px-4 py-2 border">Years in Operation</td>
            {selectedAirlines.map((airline) => (
              <td key={airline.id} className="px-4 py-2 border">
                {airline.yearsInOperation}
              </td>
            ))}
          </tr>
        </tbody>
      </table>

      <button
        onClick={() => navigate("/")}
        className="bg-blue-500 text-white py-2 px-6 rounded-lg mt-8"
      >
        Back to Home
      </button>
    </div>
  );
};

export default ComparePage;

