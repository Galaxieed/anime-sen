import NavBar from "../shared-components/nav-bar/nav-bar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from "@fortawesome/free-solid-svg-icons/faSearch";
import { AnimeCard, RecAnimeCard } from "../shared-components/anime-card/anime-card";
import { useState, useEffect, useRef } from "react";
import { getAnimeBySearch, getAnimeRecommendations } from "../services/apicalls";
import './animelist.css';
import { useLocation } from "react-router-dom";

export default function AnimeList() {
  const searchIcon = <FontAwesomeIcon icon={faSearch} />;
  const [animeList, setAnimeList] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const location = useLocation();
  const searchData = location.state && location.state.data;
  const searchDataRef = useRef(searchData);

  //initial data
  useEffect(()=>{
    if (searchDataRef.current != null || searchValue != "") {
      document.querySelector('#search').value = searchDataRef.current;
      setSearchValue(searchDataRef.current) 
      getAnimeBySearch(setAnimeList, searchDataRef.current);
    } 
    else {
      getAnimeRecommendations(setAnimeList)
    } 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  //displaying recommendation list after removing the search entry
  useEffect(() => {
    if (searchValue == '' && searchDataRef.current === null) {
      getAnimeRecommendations(setAnimeList)
    }
  }, [searchValue])

  //searching the anime upon submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    if (data.get('search')) {
      setSearchValue(data.get('search'));
      setAnimeList([]);
      getAnimeBySearch(setAnimeList, data.get('search'));
    }
  }

  //resseting the data after removing all search entries
  const handleChange = (e) => {
    if (e.target.value == '') {
      setAnimeList([]);
      setSearchValue(e.target.value)
      searchDataRef.current = null;
    }
  }

  return(
    <>
      <NavBar />
      <section className="animelist-section">
        <div className="container">
          <h2>{searchValue === '' ? (<>Anime Recommendations</>) 
            : (<>Anime Results</>)}</h2>
            <form className="searchForm" onSubmit={handleSubmit}>
              <div className="searchbar">
                  <input type="text" name="search" id="search"
                  onChange={handleChange} placeholder="Enter Keywords..." />
                  <button type="submit" className="search-button">
                    {searchIcon}
                  </button>
              </div>
            </form>          
          {animeList.length > 0 && (
            <div className="animegrid">
              {
                searchValue === "" ?
                  animeList.map(entry => {
                    return entry.entry.map(oneAnime => {
                      return createCard(entry, oneAnime)
                    })
                  }) 
                : 
                animeList != [] &&
                  animeList.map(anime => {
                    return createCard('Search', anime)
                  })
              }
            </div> 
          )}
        </div>
      </section>
    </>
  );
}

function createCard(entry, anime) {
  if (!anime) {
    return null;
  }
  if (entry == 'Search') {
    return (
      <AnimeCard 
        key={anime.mal_id}
        details={anime}
      />
    )
  }
  return (
    <RecAnimeCard 
      key={anime.mal_id}
      entry={entry}
      details={anime}
    />
  )
}
