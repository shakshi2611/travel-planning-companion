// src/api.js
import axios from "axios";

const API_URL = "GET https://freetestapi.com/api/v1/airlines"; // Replace with the actual API URL

export const fetchAirlines = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching airlines data:", error);
    return [];
  }
};
