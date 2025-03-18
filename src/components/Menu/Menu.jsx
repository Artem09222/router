import { Link } from "react-router-dom";
import menus from './Menu.module.css'

function Menu() {
    return (
        <nav className={menus.nav}>
            <Link to="/">Home</Link>
            <Link to="/movies">Movies</Link>
        </nav>
    );
}

export default Menu;
