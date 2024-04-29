import PropTypes from "prop-types";
import './anime-card.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdd, faStar, faCheck } from '@fortawesome/free-solid-svg-icons'
import dateFormatter from "../../services/dateformatter";
import { addToAnimeList } from "../../services/apicalls";
const addIcon = <FontAwesomeIcon icon={faAdd} />
const starIcon =<FontAwesomeIcon icon={faStar} />
const checkIcon =<FontAwesomeIcon icon={faCheck} />

export function RecAnimeCard(props) {
  const animeImage = {
    backgroundImage: `url(${props.details.images.jpg.image_url})`, // Set background image dynamically
  };
  const animeLink = () => window.location.href = props.details.url;

  return (
    <>
      <div className="anime-card" style={animeImage} onClick={animeLink}>
        <div className="anime-image" style={animeImage}></div>
        <div className="anime-details">
          <h3>{props.details.title}</h3>
          <h6>{props.details.mal_id}</h6>
          <p>Recommended by: <a href={props.entry.user.url}>{props.entry.user.username}</a></p>
          <h5>{dateFormatter(props.entry.date)}</h5>
        </div>
        <div className="actions">
          {/* By calling e.stopPropagation() within the onClick event handler of each action, 
          you prevent the click event from bubbling up to the parent div with the class "anime-card". */}
          <a onClick={(e) => { e.stopPropagation(); addToAnimeList(props.details, 'watchlist') }}>{addIcon}</a>
          <a onClick={(e) => { e.stopPropagation(); addToAnimeList(props.details, 'watched') }}>{checkIcon}</a>
        </div>
      </div>
    </>
  )
}

RecAnimeCard.propTypes = {
  entry: PropTypes.any,
  details: PropTypes.any
};

export function AnimeCard(props) {
  const animeImage = {
    backgroundImage: `url(${props.details.images.jpg.image_url})`, // Set background image dynamically
  };
  const animeLink = () => window.location.href = props.details.url;
  return (
    <>
      <div className="anime-card" style={animeImage} onClick={animeLink}>
        <div className="anime-image" style={animeImage}></div>
        <div className="anime-details">
          <h3>{props.details.title}</h3>
          <h4>{props.details.studios.map(studio => studio.name).join(', ')}</h4>
          <h5>{props.details.genres.map(genre => genre.name).join(', ')}</h5>
          <h5 className="score">{starIcon}: {props.details.score ? props.details.score : 0} ({props.details.type})</h5>
        </div>
        <div className="actions">
          <a onClick={(e) => { e.stopPropagation(); addToAnimeList(props.details, 'watchlist') }}>{addIcon}</a>
          <a onClick={(e) => { e.stopPropagation(); addToAnimeList(props.details, 'watched') }}>{checkIcon}</a>
        </div>
      </div>
    </>
  )
}

AnimeCard.propTypes = {
  details: PropTypes.any
}