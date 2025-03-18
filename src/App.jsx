import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { Suspense } from "react";
import "./App.css";

const Menu = React.lazy(() => import("./components/Menu/Menu"));
const Home = React.lazy(() => import("./components/Home/Home"));
const Movies = React.lazy(() => import("./components/Movies/Movies"));
const MoviesDetails = React.lazy(() => import("./components/MoviesDetails/MoviesDetails"));
const Credits = React.lazy(() => import("./components/Credits/Credits"));

function App() {
    return (
        <Router>
            <Suspense fallback={<div>Завантаження...</div>}>
                <Menu />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/movies" element={<Movies />} />
                    <Route path="/movies/:movieId" element={<MoviesDetails />} />
                    <Route path="/movies/:movieId/cast" element={<Credits />}/>
                </Routes>
            </Suspense>
        </Router>
    );
}

export default App;

