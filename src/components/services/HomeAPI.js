import axios from "axios"
const API_URL = 'https://api.themoviedb.org/3';
const API_KEY = "7491b3c4559e1898f1f08e5d3c6588d5";

export const getFetchedMovies = async function(page = 1) {
    try {
        const response = await axios.get(`${API_URL}/trending/movie/week`, {
            params: {
                api_key: API_KEY,
                page,
            }
        })
        return response.data;
    } catch (error) {
        console.log(error);
    }
}