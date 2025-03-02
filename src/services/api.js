import axios from 'axios';

// API key from OMDb API
const API_KEY = '340677b6';
const BASE_URL = 'https://www.omdbapi.com/';

// Search for movies by title
export const searchMovies = async (title, page = 1) => {
  try {
    const response = await axios.get(`${BASE_URL}?s=${encodeURIComponent(title)}&page=${page}&apikey=${API_KEY}`);
    return response.data;
  } catch (error) {
    console.error('Error searching movies:', error);
    throw error;
  }
};

// Get detailed information about a specific movie by IMDb ID
export const getMovieDetails = async (imdbID) => {
  try {
    const response = await axios.get(`${BASE_URL}?i=${imdbID}&apikey=${API_KEY}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
};