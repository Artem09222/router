import { useEffect, useState } from "react";
import styles from "./Movies.module.css"; 
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function Movies() {
    const [query, setQuery] = useState("");
    const [api, setApi] = useState([]);
    const [loading, setLoading] = useState(false);

    const API_Key = "7491b3c4559e1898f1f08e5d3c6588d5";    

    const fetchData = async (searchQuery) => {
        if (!searchQuery) return;
        const API_Url = `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&include_adult=false&language=en-US&page=1&api_key=${API_Key}`;
        
        setLoading(true);
        try {
            const response = await fetch(API_Url);
            const data = await response.json();
            setApi(data.results || []);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if(query === "") {
            setApi([]);
            return;
        }
        fetchData(query);
    }, [query]);

    return (
        <div className={styles.container}>
            <nav>
                <Link to="/" className={styles.backButton}></Link>
            </nav>
            <h1 className={styles.title}>🎬 Find Your Movie 🎥</h1>
            <input
                className={styles.input}
                type="text"
                placeholder="Type a keyword to find a movie..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            {loading ? <p className={styles.loading}>Loading...</p> : null}
            <ul className={styles.movieList}>
                {api.map((item) => (
                    <li className={styles.movieItem} key={item.id}>
                        {item.title}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Movies;

Movies.propTypes = {
    api: PropTypes.shape({
        title: PropTypes.string
    })
}