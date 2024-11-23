import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './components/Header'
import HomePage from "./pages/Home";
import ComparePage from "./pages/ComparePage";

const App = () => {
  return (
    <Router>
      <div>
        <header>
          <Header/>
        </header>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/compare" element={<ComparePage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
