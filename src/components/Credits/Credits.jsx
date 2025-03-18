import { useEffect, useState } from "react"
import { gettingActors } from "../services/MoviesDetailsAPI";
import { useParams } from "react-router-dom";
import module from './Credits.module.css';

const Credits = () => {
    const [actors, setActors] = useState([]);
    const { movieId } = useParams();

    useEffect(() => {
        async function fetchActors() {
            try {
                const actorsData = await gettingActors(movieId);
                setActors(actorsData);
                console.log("Actors:", actorsData)
            } catch (error) {
                console.log(error);
            }
        }
        fetchActors()
    }, [movieId])

    return(
        <div>
            <ul className={module.map}>
                {actors.map((actor) => (
                    <li className={module.title} key={actor.id}>{actor.name}</li>
                ))}
            </ul>
        </div>
    )
}

export default Credits