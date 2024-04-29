import NavBar from "../shared-components/nav-bar/nav-bar";
import './watchlist.page.css';
import { useState, useEffect } from "react";
import { getAnimeList } from "../services/apicalls";
import AnimeListItem from "../shared-components/anime-list/anime-list";

export default function WatchListPage() {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    getAnimeList(setWatchlist, 'watchlist')
  }, [watchlist])

  return (
    <>
      <NavBar />
      <section className="watched-section">
        <div className="container">
          <h2>My Watchlist ({watchlist.length})</h2>
          
          <div className="animegrid">
            {watchlist.length !== 0 ?
              watchlist.map(anime => {
                return (<AnimeListItem key={anime.mal_id} details={anime}/>)
              }) :
              <p>No Data</p>
            }
          </div>

        </div>
      </section>
    </>
  )
}