import React from "react";
import TravelPlan from "./components/TravelPlan";
import "./index.css";
import airportImage from './assets/airport.jpg';

function App() {
  return (
    <div
      className="App min-h-screen bg-no-repeat bg-center"
      style={{
        backgroundImage: `url(${airportImage})`,
        backgroundSize: 'cover',  
        backgroundPosition: 'center',  // Centers the image
        backgroundAttachment: 'fixed'  // Optional: Makes the background fixed during scrolling
      }}
    >
      <div className="w-full rounded-lg shadow-xl p-12 mx-auto ">
        <TravelPlan />
      </div>
    </div>
  );
}

export default App;

