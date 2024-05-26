import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3/';
const headers = {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMDk3MmZkYWVjZDI0ZjhmMzFiNmU3NmM5N2M0YjZmZiIsInN1YiI6IjY2NTE4Yjk4NzBjOGFlYjFmNzk5YTc2MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6ZgV9ch0TP-zcV2hRTjy-4Y4vQf-JcBIsZ9OVtEhB-g'
  }

export const getPopular = async () => {
    const response = await axios.get(`trending/movie/day`, { headers });   
  return response.data.results;
};

export const getMovie = async (query) => {
    const response = await axios.get(`search/movie?query=${query}`, { headers }); 
  return response.data;
};

export const getMovieDetails = async (id) => {
    const response = await axios.get(`movie/${id}`, { headers }); 
  return response.data;
};

export const getMovieCredits = async (id) => {
    const response = await axios.get(`movie/${id}/credits`, { headers }); 
  return response.data.cast;
};

export const getMovieReviews = async (id) => {
    const response = await axios.get(`movie/${id}/reviews`, { headers }); 
  return response.data.results;
};