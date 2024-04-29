import { createBrowserRouter } from 'react-router-dom'
import Homepage from '../assets/homepage/homepage';
import AnimeList from '../assets/animelist-page/animelist';
import ErrorPage from '../assets/shared-components/error-page';
import WatchListPage from '../assets/watchlist-page/watchlist.page';
import WatchedPage from '../assets/watched-page/watched.page';
const router = createBrowserRouter([
  {
    path: '/',
    element: <Homepage />,
    errorElement: <ErrorPage />,
  }, {
    path: '/animelist',
    element: <AnimeList />,
    errorElement: <ErrorPage />,
  }, {
    path: '/watchlist',
    element: <WatchListPage />,
    errorElement: <ErrorPage />,
  }, {
    path: '/watched',
    element: <WatchedPage />,
    errorElement: <ErrorPage />,
  }
])

export default router;
