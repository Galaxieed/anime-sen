import NavBar from "../shared-components/nav-bar/nav-bar";
import './homepage.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from "@fortawesome/free-solid-svg-icons/faSearch";
import { faArrowCircleRight } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
export default function Homepage() {
  const searchIcon = <FontAwesomeIcon icon={faSearch} />
  const arrowRightIcon = <FontAwesomeIcon icon={faArrowCircleRight} />
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = new FormData(e.target);
    if (data.get('search')) {
      navigate(
        '/animelist',
        {
          state: {
            data: data.get('search')
          }
        } 
      )
    }
  }
  return (
    <section className="homepage-section">
      <NavBar />
      <div className="container">
        <div className="logo">
          <h1>AnimeSen</h1>
        </div>
        <form className="searchForm" onSubmit={handleSubmit}>
          <div className="searchbar">
              <input type="text" name="search" id="search" 
                placeholder="Enter Keywords..." />
              <button type="submit" className="search-button">
                {searchIcon}
              </button>
          </div>
        </form>
        <div className="bottom-part">
          <Link to={'/animelist'} className="view-site-button">
            View Full Site &nbsp; {arrowRightIcon}
          </Link>
          <p>AnimeSen is a website that uses API to send request about different anime related terms.</p>
        </div>
      </div>
    </section>
  );
}