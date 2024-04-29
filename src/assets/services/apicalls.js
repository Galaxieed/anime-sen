// Jikan API calls
export async function getAnimeRecommendations(setter) {
  try {
    const response = await fetch('https://api.jikan.moe/v4/recommendations/anime?page=' + Math.floor(Math.random() * 10) + 1);
    const jsonData = await response.json();
    setter(filterDuplicateMalIds(jsonData.data, false));
  } catch (e) {
    console.error(e);
  }
}

export async function getAnimeBySearch(setter, searchValue) {
  try {
    const response = await fetch('https://api.jikan.moe/v4/anime?q=' + searchValue + '&sfw=true');
    const jsonData = await response.json();
    setter(filterDuplicateMalIds(jsonData.data, true));
  } catch (e) {
    console.error(e);
  }
}

// Database Calls
export async function addToAnimeList(data, type) {
  try {
    const response = await fetch('http://localhost:3301/list/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'mal_id': data.mal_id,
        'title': data.title,
        'image_url': data.images.jpg.image_url,
        'mal_url': data.url,
        'list_type': type
      })
    });

    if (!response.ok) {
      throw new Error('Failed to add this anime');
    }

    alert('Success');
  } catch (error) {
    console.error("Frontend error inserting data: ", error);
    alert("Failed to add to " + type)
  }
}

export async function updateWatchlistToWatched(data) {
  try {
    const response = await fetch('http://localhost:3301/list/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'mal_id': data.data
      })
    });

    if (!response.ok) {
      throw new Error('Failed to update this anime');
    }

    alert('Success');
  } catch (error) {
    console.error("Frontend error updating data: ", error);
    alert("Failed to add to watched list")
  }
}

export async function getAnimeList(setterState, type) {
  try {
    const response = await fetch('http://localhost:3301/list/get?list_type=' + type, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error('Failed to get anime list');
    }

    const jsonData = await response.json();
    setterState(jsonData.reverse());
  } catch (error) {
    console.error(error)
  }
}

// Extra functions
function filterDuplicateMalIds(animes, isSearching) {
  if (!animes) return;
  let newAnimeList = [];
  let oneSetId = new Set();

  if (isSearching) {
    newAnimeList = animes.filter(anime => {
      if (!oneSetId.has(anime.mal_id)) {
        oneSetId.add(anime.mal_id)
        return true;
      } else {
        return false;
      }
    });
  } else {
    newAnimeList = animes.map(anime => {
      anime.entry = anime.entry.filter(entry => {
        if (!oneSetId.has(entry.mal_id)) {
          oneSetId.add(entry.mal_id);
          return true;
        } else {
          return false;
        }
      });
      return anime;
    });
  }

  return newAnimeList
}