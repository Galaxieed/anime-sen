import PropTypes from "prop-types";
import './anime-list.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faRemove } from "@fortawesome/free-solid-svg-icons";
import { updateWatchlistToWatched, deleteWatchedAnime } from "../../services/apicalls";
import { useState } from "react";

const checkIcon = <FontAwesomeIcon icon={faCheck} />
const removeIcon = <FontAwesomeIcon icon={faRemove} />

export default function AnimeListItem(props) {
  const animeImage = {
    backgroundImage: `url(${props.details.image_url})`,
  };
  const animeLink = () => window.location.href = props.details.mal_url;

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false); 
  };

  return (
    <>
      <div className="list-item" style={animeImage} 
      onClick={animeLink} 
      onMouseEnter={handleMouseEnter} 
      onMouseLeave={handleMouseLeave}>
        <p>{props.details.title}</p>
        { isHovered && <CircleCheck mal_id={props.details.mal_id} list_type={props.details.list_type}/>}
      </div>
    </>
  )
}


AnimeListItem.propTypes = {
  details: PropTypes.any
};

function CircleCheck(props) {
  if (props.list_type === 'watchlist') {
      return (
        <div className="circle-check" style={{backgroundColor: 'green'}} onClick={(e) => { e.stopPropagation(); updateWatchlistToWatched(props.mal_id) }}>
          {checkIcon}
        </div>
      )
    
  } else {
    return (
      <div className="circle-check" style={{backgroundColor: 'red'}} onClick={(e) => { e.stopPropagation(); deleteWatchedAnime(props.mal_id) }}>
        {removeIcon}
      </div>
    )
  }
}

CircleCheck.propTypes = {
  mal_id: PropTypes.any,
  list_type: PropTypes.any
}