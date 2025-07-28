// src/api/api.js
import axios from 'axios';

const BACKEND_ENDPOINT = "https://qtify-backend-labs.crio.do";

/**
 * Fetches top albums from the QTify backend API using Axios.
 * @returns {Promise<Array>} A promise that resolves to an array of top album objects.
 */
export const fetchTopAlbums = async () => {
  try {
    const response = await axios.get(`${BACKEND_ENDPOINT}/albums/top`);
    return response.data;
  } catch (error) {
    console.error("Error fetching top albums:", error);
    return [];
  }
};

/**
 * Fetches new albums from the QTify backend API using Axios.
 * @returns {Promise<Array>} A promise that resolves to an array of new album objects.
 */
export const fetchNewAlbums = async () => { // NEW FUNCTION
  try {
    const response = await axios.get(`${BACKEND_ENDPOINT}/albums/new`);
    return response.data;
  } catch (error) {
    console.error("Error fetching new albums:", error);
    return [];
  }
};

// You can add other API fetching functions here later if needed
// export const fetchSongs = async () => { ... };
