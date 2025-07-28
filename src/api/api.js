// src/api/api.js
import axios from 'axios'; // Import Axios

const BACKEND_ENDPOINT = "https://qtify-backend-labs.crio.do";

/**
 * Fetches top albums from the QTify backend API using Axios.
 * @returns {Promise<Array>} A promise that resolves to an array of top album objects.
 */
export const fetchTopAlbums = async () => {
  try {
    const response = await axios.get(`${BACKEND_ENDPOINT}/albums/top`); // Use axios.get
    return response.data; // Axios puts the response data in .data
  } catch (error) {
    console.error("Error fetching top albums:", error);
    return []; // Return an empty array in case of error
  }
};

// You can add other API fetching functions here later if needed
// export const fetchNewAlbums = async () => { ... };
// export const fetchSongs = async () => { ... };
