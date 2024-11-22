import React, { useEffect, useState } from "react";
import axios from "axios";
import AirlineCard from "./AirlineCard"; // Airline card component to render airline details

const TravelPlan = () => {
  const [airlines, setAirlines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [departureCity, setDepartureCity] = useState("");
  const [arrivalCity, setArrivalCity] = useState("");
  const [filteredAirlines, setFilteredAirlines] = useState([]);
  const [searchClicked, setSearchClicked] = useState(false);
  const [sameCityError, setSameCityError] = useState(false);

  // Function to fetch airline data from the API
  const fetchAirlines = async () => {
    try {
      const response = await axios.get("/api/v1/airlines"); // Replace with your API endpoint
      setAirlines(response.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch airline data. Please try again later.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAirlines(); // Fetch airline data on component mount
  }, []);

  // Function to filter airlines by departure and arrival cities
  const filterAirlines = () => {
    if (!departureCity || !arrivalCity) {
      setFilteredAirlines([]);
    } else if (departureCity.toLowerCase() === arrivalCity.toLowerCase()) {
      setSameCityError(true); // Show error when cities are the same
      setFilteredAirlines([]);
    } else {
      setSameCityError(false); // Reset error if cities are different
      const filtered = airlines.filter((airline) =>
        airline.destinations.some(
          (destination1) =>
            destination1.name.toLowerCase() === departureCity.toLowerCase() &&
            airline.destinations.some(
              (destination2) =>
                destination2.name.toLowerCase() === arrivalCity.toLowerCase()
            )
        )
      );
      setFilteredAirlines(filtered);
    }
    setSearchClicked(true); // Mark that the search button was clicked
  };

  // Function to reset all inputs and filtered results
  const resetFilters = () => {
    setDepartureCity("");
    setArrivalCity("");
    setFilteredAirlines([]);
    setSearchClicked(false); // Reset the search state
    setSameCityError(false); // Reset same city error state
  };

  return (
    <div className="travel-plan text-center py-8">
      <h1 className="text-6xl font-bold text-white mb-8">
        Travel Planning Companion
      </h1>

      {/* Input fields for departure and arrival cities */}
      <div className="mb-8">
        <input
          type="text"
          className="px-4 py-2 rounded-md w-full sm:w-auto"
          placeholder="Departure City"
          value={departureCity}
          onChange={(e) => setDepartureCity(e.target.value)}
        />
        <input
          type="text"
          className="px-4 py-2 rounded-md mx-4 w-full sm:w-auto"
          placeholder="Arrival City"
          value={arrivalCity}
          onChange={(e) => setArrivalCity(e.target.value)}
        />
      </div>

      {/* Search and Reset buttons */}
      <div className="flex justify-center gap-4 mb-8">
        <button
          onClick={filterAirlines}
          className="bg-blue-500 text-white py-2 px-6 rounded-lg"
        >
          Search Flights
        </button>
        <button
          onClick={resetFilters}
          className="bg-gray-500 text-white py-2 px-6 rounded-lg"
        >
          Reset
        </button>
      </div>

      {/* Show cute quote if departure and arrival cities are the same */}
      {sameCityError && searchClicked && (
        <div className="text-center text-xl text-white">
          <p>"It seems you're traveling to the same city. Please select a different destination to find flights."</p>
        </div>
      )}

      {/* Loading, Error, and Results Handling */}
      {loading ? (
        <p>Loading airlines...</p>
      ) : error ? (
        <p>{error}</p>
      ) : searchClicked && filteredAirlines.length === 0 && !sameCityError ? (
        <p>No flights available for the selected route.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 mt-8 mx-12">
  {filteredAirlines.map((airline) => (
    <AirlineCard key={airline.id} airline={airline} />
  ))}
</div>
      )}
    </div>
  );
};

export default TravelPlan;
