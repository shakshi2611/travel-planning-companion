import React, { useEffect, useState } from "react";
import axios from "axios";

const DestinationPage = () => {
  // State hooks for airlines data, loading state, and error message
  const [airlines, setAirlines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch airlines data
  const fetchAirlines = async () => {
    try {
      const response = await axios.get("/api/v1/airlines");
      setAirlines(response.data);
      setLoading(false);
    } catch (err) {
      setError("Error fetching airlines data: " + err.message);
      setLoading(false);
    }
  };

  // Use useEffect to fetch data when the component mounts
  useEffect(() => {
    fetchAirlines();
  }, []);

  return (
    <div className="bg-gray-300 min-h-screen p-6">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Airlines Information
        </h1>

        {loading && (
          <p className="text-center text-blue-500 font-semibold">
            Loading airlines data...
          </p>
        )}

        {error && (
          <p className="text-center text-red-500 font-semibold">{error}</p>
        )}

        {!loading && !error && (
          <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-blue-500 text-white">
                  <th className="px-4 py-2 border border-gray-300">
                    Airline Name
                  </th>
                  <th className="px-4 py-2 border border-gray-300">Country</th>
                  <th className="px-4 py-2 border border-gray-300">
                    Flight Code
                  </th>
                  <th className="px-4 py-2 border border-gray-300">
                    Destinations code
                  </th>
                  <th className="px-4 py-2 border border-gray-300">fleet size</th>
                  <th className="px-4 py-2 border border-gray-300">
                    Destinations
                  </th>
                  <th className="px-4 py-2 border border-gray-300">
                    Headquarters
                  </th>
                </tr>
              </thead>
              <tbody>
                {airlines.map((airline, index) => (
                  <tr
                    key={airline.id}
                    className={`${
                      index % 2 === 0 ? "bg-gray-100" : "bg-white"
                    } hover:bg-blue-100`}
                  >
                    <td className="px-4 py-2 border border-gray-300 text-gray-800">
                      {airline.name}
                    </td>
                    <td className="px-4 py-2 border border-gray-300 text-gray-800">
                      {airline.country}
                    </td>
                    <td className="px-4 py-2 border border-gray-300 text-gray-800">
                      {airline.code}
                    </td>
                    <td className="px-4 py-2 border border-gray-300 text-gray-800">
                    <ul>
                        {airline.destinations.map((destination) => (
                          <li
                            key={destination.code}
                            className="flex justify-between"
                          >
                            <span>({destination.code})</span>
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="px-4 py-2 border border-gray-300 text-gray-800">
                      {airline.fleet_size}
                    </td>
                    <td className="px-4 py-2 border border-gray-300 text-gray-800">
                      <ul>
                        {airline.destinations.map((destination) => (
                          <li
                            key={destination.code}
                            className="flex justify-between"
                          >
                            <span>{destination.name}</span>
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="px-4 py-2 border border-gray-300 text-gray-800">
                      {airline.headquarters}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default DestinationPage;

