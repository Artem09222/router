import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { gettingMoviesDetails } from "../services/MoviesDetailsAPI";
import { useParams, Link } from "react-router-dom";
import styles from "./MoviesDetails.module.css";

const MoviesDetails = () => {
    const { movieId } = useParams();
    const [moviesDetails, setMovieDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const fetchDatas = await gettingMoviesDetails(movieId);
                console.log("Fetched Movie Details:", fetchDatas);
                setMovieDetails(fetchDatas);
            } catch (error) {
                setError("Помилка завантаження фільму", error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [movieId]);

    if (loading) return <p>Loading film...</p>;
    if (error) return <p>{error}</p>;
    if (!moviesDetails) return <p>Film is not found</p>;

    return (
        <div className={styles.container}>
            <nav>
              <Link to="/" className={styles.backButton}></Link>
            </nav>
            <div className={styles.divDetails}>
               <h1 className={styles.title}>{moviesDetails.title}</h1>
               <img 
                className={styles.poster}
                src={`https://image.tmdb.org/t/p/w500${moviesDetails.poster_path}`} 
                alt={moviesDetails.title} 
               />
              <p className={styles.overview}>{moviesDetails.overview}</p>
              <p className={styles.rating}><strong>Рейтинг:</strong> ⭐ {moviesDetails.vote_average}</p>
              <p className={styles.release}><strong>Дата виходу:</strong> {moviesDetails.release_date}</p>
              <Link to={`/movies/${movieId}/cast`} className={styles.release}>Actors:</Link>
           </div>
        </div>
    );
};
export default MoviesDetails

MoviesDetails.propTypes = {
    moviesDetails: PropTypes.shape({
        title: PropTypes.string,
        poster_path: PropTypes.string,
        overview: PropTypes.string,
        vote_average: PropTypes.number,
        release_date: PropTypes.string,
    })
};