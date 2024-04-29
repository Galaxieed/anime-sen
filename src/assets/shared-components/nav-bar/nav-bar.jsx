import { Link } from "react-router-dom";
import './nav-bar.css'
export default function NavBar() {
  return (
    
      <div className="navbar">
        <Link to={'/'} className="dicon">
          <img src="../../../../vite.svg" alt="xicon" />
          <h2>AnimeSen</h2>
        </Link>
        <div className="dactions">
          <ul>
            <li><Link to={'/animelist'}>Anime list</Link></li>
            <li><Link to={'/watchlist'}>Watchlist</Link></li>
            <li><Link to={'/watched'}>Watched</Link></li>
          </ul>
        </div>
      </div>
    
  );
}