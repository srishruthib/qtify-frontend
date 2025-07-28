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
export const fetchNewAlbums = async () => {
  try {
    const response = await axios.get(`${BACKEND_ENDPOINT}/albums/new`);
    return response.data;
  } catch (error) {
    console.error("Error fetching new albums:", error);
    return [];
  }
};

/**
 * Fetches genres from the QTify backend API using Axios.
 * @returns {Promise<Array>} A promise that resolves to an array of genre objects.
 */
export const fetchGenres = async () => { // NEW FUNCTION
  try {
    const response = await axios.get(`${BACKEND_ENDPOINT}/genres`);
    return response.data.data; // Genres API returns data inside a 'data' property
  } catch (error) {
    console.error("Error fetching genres:", error);
    return [];
  }
};

/**
 * Fetches all songs from the QTify backend API using Axios.
 * @returns {Promise<Array>} A promise that resolves to an array of song objects.
 */
export const fetchAllSongs = async () => { // NEW FUNCTION
  try {
    const response = await axios.get(`${BACKEND_ENDPOINT}/songs`);
    return response.data;
  } catch (error) {
    console.error("Error fetching all songs:", error);
    return [];
  }
};
