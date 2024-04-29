import PropTypes from "prop-types";
import './anime-list.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { updateWatchlistToWatched } from "../../services/apicalls";
import { useState } from "react";

const checkIcon = <FontAwesomeIcon icon={faCheck} />

export default function AnimeListItem(props) {
  const animeImage = {
    backgroundImage: `url(${props.details.image_url})`, // Set background image dynamically
  };
  const animeLink = () => window.location.href = props.details.mal_url;

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true); // Set isHovered to true on mouse enter
  };

  const handleMouseLeave = () => {
    setIsHovered(false); // Set isHovered to false on mouse leave
  };

  return (
    <>
      <div className="list-item" style={animeImage} 
      onClick={animeLink} 
      onMouseEnter={handleMouseEnter} 
      onMouseLeave={handleMouseLeave}>
        <p>{props.details.title}</p>
        { isHovered && props.details.list_type == 'watchlist' && <CircleCheck data={props.details.mal_id}/>}
      </div>
    </>
  )
}


AnimeListItem.propTypes = {
  details: PropTypes.any
};

function CircleCheck(props) {
  return (
    <div className="circle-check" onClick={(e) => { e.stopPropagation(); updateWatchlistToWatched(props) }}>
      {checkIcon}
    </div>
  )
}

CircleCheck.propTypes = {
  mal_id: PropTypes.any
}