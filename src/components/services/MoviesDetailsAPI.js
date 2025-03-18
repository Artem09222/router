import axios from "axios"
const API_URL = 'https://api.themoviedb.org/3';
const API_KEY = "7491b3c4559e1898f1f08e5d3c6588d5";


export const gettingMoviesDetails = async function(movieId) {
    try {
        const response = await axios.get(`${API_URL}/movie/${movieId}`, {
            params: {
                api_key: API_KEY
            }
        })
        return response.data;

    } catch (error) {
        console.error(error);
    }
}

export const gettingActors = async function(movieId) {
    try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits`, {
            params: {
                api_key: API_KEY
            }
        })
        return response.data.cast;
    } catch (error) {
        console.log(error);
        return [];
    }
}