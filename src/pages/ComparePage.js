import React from "react";
import { useLocation } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label } from 'recharts';

const ComparePage = () => {
  const location = useLocation();
  const { selectedAirlines } = location.state || { selectedAirlines: [] };

  const getAirlineComparisonData = (airline) => ({
    fleetSize: airline.fleet_size || "N/A",
    destinationsServed: airline.destinations ? airline.destinations.length : "N/A",
    headquarters: airline.headquarters || "N/A",
    website: airline.website || "N/A",
    code: airline.code || "N/A",
    founded: airline.founded || "N/A",
    yearsInOperation: airline.founded
      ? new Date().getFullYear() - parseInt(airline.founded, 10)
      : "N/A",
  });

  // Graph data - Fleet Size and Destinations
  const graphData = selectedAirlines.map(airline => ({
    name: airline.name,
    fleetSize: airline.fleet_size ? parseInt(airline.fleet_size.replace("+", "")) : 0,  // Fleet size as number
    destinations: airline.destinations ? airline.destinations.length : 0,
  }));

  return (
    <div className="container mx-auto py-12 text-center" >
      <h1 className="text-4xl font-bold mb-8">Airline Comparison</h1>
      
      {/* Comparison Table */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {selectedAirlines.length === 0 ? (
          <p>No airlines selected for comparison.</p>
        ) : (
          selectedAirlines.map((airline) => {
            const comparisonData = getAirlineComparisonData(airline);
            return (
              <div key={airline.id} className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-2xl font-semibold mb-4">{airline.name}</h3>
                <p><strong>Flight Size:</strong> {comparisonData.fleetSize}</p>
                <p><strong>Code:</strong> {comparisonData.code}</p>
                <p><strong>Founded:</strong> {comparisonData.founded}</p>
                <p><strong>Years in Operation:</strong> {comparisonData.yearsInOperation} years</p>
                <p><strong>Headquarters:</strong> {comparisonData.headquarters}</p>
                <p><strong>Destinations Served:</strong> {comparisonData.destinationsServed}</p>
                <p>
                  <strong>Website:</strong>{" "}
                  {comparisonData.website !== "N/A" ? (
                    <a
                      href={comparisonData.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      {comparisonData.website}
                    </a>
                  ) : (
                    "N/A"
                  )}
                </p>
              </div>
            );
          })
        )}
      </div>

      {/* Graphs Section */}
      {selectedAirlines.length > 0 && (
        <div className="mt-12">
          {/* Fleet Size Comparison */}
          <div className="mb-8">
            <h3 className="text-2xl font-semibold mb-4">Fleet Size Comparison</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={graphData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name">
                  <Label offset={0} position="insideBottom" />
                </XAxis>
                <YAxis>
                  <Label value="Fleet Size" angle={-90} position="insideLeft" />
                </YAxis>
                <Tooltip contentStyle={{ backgroundColor: '#f5f5f5', borderRadius: '5px' }} />
                <Legend verticalAlign="top" align="center" />
                <Bar dataKey="fleetSize" fill="#8884d8" barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Destinations Served Comparison */}
          <div>
            <h3 className="text-2xl font-semibold mb-4">Destinations Served Comparison</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={graphData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name">
                  <Label offset={0} position="insideBottom" />
                </XAxis>
                <YAxis>
                  <Label value="Destinations" angle={-90} position="insideLeft" />
                </YAxis>
                <Tooltip contentStyle={{ backgroundColor: '#f5f5f5', borderRadius: '5px' }} />
                <Legend verticalAlign="top" align="center" />
                <Bar dataKey="destinations" fill="#82ca9d" barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComparePage;
