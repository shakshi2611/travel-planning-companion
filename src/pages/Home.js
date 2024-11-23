import React, { useEffect, useState } from "react";
import axios from "axios";
import "../index.css";
import airportImage from '../assets/airport.jpg';
import { Link } from "react-router-dom";

const AirlineCard = ({ airline, handleSelectAirline, selectedAirlines }) => {
  const isSelected = selectedAirlines.some(
    (selectedAirline) => selectedAirline.id === airline.id
  );

  return (
    <div className="airline-card bg-white bg-opacity-55 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
      <h3 className="text-2xl text-black font-semibold mb-4">{airline.name}</h3>
      <p className="text-md mb-6 text-gray-100">
        Destinations: {airline.destinations.map(destination => destination.name).join(", ")}
      </p>

      {/* Direct booking link */}
      {airline.website && (
        <a
          href={airline.website}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-500 text-black py-2 px-4 rounded-lg text-center block mt-4 hover:bg-blue-600 transition-colors duration-200"
        >
          Book Now
        </a>
      )}

      {/* Select Airline Button */}
      <button
        onClick={() => handleSelectAirline(airline)}
        className={`py-2 px-4 rounded-lg mt-4 transition-colors duration-300 ${
          isSelected
            ? "bg-green-500 text-white hover:bg-green-600"
            : "bg-blue-500 text-black hover:bg-blue-600"
        }`}
      >
        {isSelected ? "Selected" : "Select Airline"}
      </button>
    </div>
  );
};

const HomePage = () => {
  const [airlines, setAirlines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [departureCity, setDepartureCity] = useState("");
  const [arrivalCity, setArrivalCity] = useState("");
  const [filteredAirlines, setFilteredAirlines] = useState([]);
  const [searchClicked, setSearchClicked] = useState(false);
  const [sameCityError, setSameCityError] = useState(false);
  const [selectedAirlines, setSelectedAirlines] = useState([]);

  // Fetch airline data from API
  const fetchAirlines = async () => {
    try {
      const response = await axios.get("/api/v1/airlines");
      setAirlines(response.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch airline data. Please try again later.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAirlines();
  }, []);

  const handleSelectAirline = (airline) => {
    // Prevent adding duplicates
    if (!selectedAirlines.some((selectedAirline) => selectedAirline.id === airline.id)) {
      setSelectedAirlines((prevState) => [...prevState, airline]);
    }
  };

  const filterAirlines = () => {
    if (!departureCity || !arrivalCity) {
      setFilteredAirlines([]);
    } else if (departureCity.toLowerCase() === arrivalCity.toLowerCase()) {
      setSameCityError(true);
      setFilteredAirlines([]);
    } else {
      setSameCityError(false);
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
    setSearchClicked(true);
  };

  const resetFilters = () => {
    setDepartureCity("");
    setArrivalCity("");
    setFilteredAirlines([]);
    setSearchClicked(false);
    setSameCityError(false);
  };

  return (
    <div
      className="Home min-h-screen bg-no-repeat bg-cover bg-fixed"
      style={{
        backgroundImage: `url(${airportImage})`,
        backgroundPosition: "center",
      }}
    >
      <div className="container mx-auto py-12 text-center text-white">
        <h1 className="text-6xl font-bold mb-4">RoamRoute</h1>
        <p className="mb-8 text-2xl font-bold">"Pack Your Bags, We've Got the Plan"</p>

        {/* Input fields for departure and arrival cities */}
        <div className="mb-8">
          <input
            type="text"
            className="px-4 py-2 rounded-md w-full sm:w-auto text-black placeholder-gray-400"
            placeholder="Departure City"
            value={departureCity}
            onChange={(e) => setDepartureCity(e.target.value)}
          />
          <input
            type="text"
            className="px-4 py-2 rounded-md mx-4 w-full sm:w-auto text-black placeholder-gray-400"
            placeholder="Arrival City"
            value={arrivalCity}
            onChange={(e) => setArrivalCity(e.target.value)}
          />
        </div>

        {/* Search and Reset buttons */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={filterAirlines}
            className="bg-blue-500 text-black py-2 px-6 rounded-lg"
          >
            Search Flights
          </button>
          <button
            onClick={resetFilters}
            className="bg-gray-500 text-black py-2 px-6 rounded-lg"
          >
            Reset
          </button>
        </div>

        {/* Show error or results */}
        {sameCityError && searchClicked ? (
          <div className="text-xl text-red-500">
            <p>"It seems you're traveling to the same city. Please select a different destination to find flights."</p>
          </div>
        ) : searchClicked && filteredAirlines.length === 0 && !sameCityError ? (
          <p>No flights available for the selected route.</p>
        ) : loading ? (
          <p>Loading airlines...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 mt-8 mx-12">
            {filteredAirlines.map((airline) => (
              <AirlineCard
                key={airline.id}
                airline={airline}
                handleSelectAirline={handleSelectAirline}
                selectedAirlines={selectedAirlines}
              />
            ))}
          </div>
        )}

        {/* Show "Compare Selected Airlines" button only when there are filtered airlines */}
        {filteredAirlines.length > 0 && selectedAirlines.length > 0 && (
          <Link to="/compare" state={{ selectedAirlines }}>
            <button className="bg-green-500 text-white py-2 px-6 rounded-lg mt-8 hover:bg-green-600 transition-colors">
              Compare Selected Airlines
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default HomePage;
