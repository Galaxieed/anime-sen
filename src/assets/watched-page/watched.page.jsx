import NavBar from "../shared-components/nav-bar/nav-bar";
import './watched.page.css';
import { getAnimeList } from "../services/apicalls";
import { useEffect, useState } from "react";
import AnimeListItem from "../shared-components/anime-list/anime-list";


export default function WatchedPage() {
  const [watchedList, setWatchedList] = useState([]);

  useEffect(() => {
    getAnimeList(setWatchedList, 'watched')
  }, [watchedList])


  return (
    <>
      <NavBar />
      <section className="watched-section">
        <div className="container">
          <h2>Watched Anime List ({watchedList.length})</h2>
          
          <div className="animegrid">
            {watchedList.length !== 0 ?
              watchedList.map(anime => {
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


