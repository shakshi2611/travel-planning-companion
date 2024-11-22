import React from "react";

const AirlineCard = ({ airline }) => {
  return (
    <div className="airline-card bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
      <h3 className="text-2xl font-semibold mb-4">{airline.name}</h3>
      <p className="text-md mb-6 text-gray-600">
        Destination: {airline.destinations.map(destination => destination.name).join(", ")}
      </p>

      {/* Direct booking link */}
      {airline.website && (
        <a
          href={airline.website}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-500 text-white py-2 px-4 rounded-lg text-center block mt-4 hover:bg-blue-600 transition-colors duration-200"
        >
          Book Now
        </a>
      )}
    </div>
  );
};

export default AirlineCard;
