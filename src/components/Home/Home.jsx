import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getFetchedMovies } from "../services/HomeAPI";
import styles from "./Home.module.css"; 

function Home() {
    const [home, setHome] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(null);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            const fetchDatas = await getFetchedMovies();
            console.log("Fetched Movies in Home:", fetchDatas);
            setHome(fetchDatas);
            if (fetchDatas) {
                setHome(fetchDatas.results)
                setTotalPages(fetchDatas.total_pages);
            }
            setLoading(false)
        }
        fetchData();
    }, [page]);

    return (
            <div className={styles.container}>
                <h1 className={styles.title}>🔥 Trending Today 🔥</h1>
                <div>
                    {loading && home.length === 0 ? (
                        <p className={styles.loading}>Loading movies...</p>
                    ) : (
                        <>
                            <ul className={styles.movieList}>
                                {home.map((movie) => (
                                    <li className={styles.movieItem} key={movie.id}>
                                        <Link className={styles.movieLink} to={`/movies/${movie.id}`}>
                                            {movie.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
        
                            {totalPages && (
                                <div className={styles.pagination}>
                                    <button disabled={page === 1} onClick={() => setPage((perPage) => perPage - 1)}>
                                        Назад
                                    </button>
                                    <span>
                                        Сторінка {page} з {totalPages}
                                    </span>
                                    <button disabled={page >= totalPages} onClick={() => setPage((per) => per + 1)}>
                                        Вперед
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        );
}

export default Home;
