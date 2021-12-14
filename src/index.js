
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import ReactDOM from "react-dom";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import FavoriteMoviesPage from "./pages/favoriteMoviesPage"; // NEW
import LoginPage from "./pages/LoginPage";
import signUpPage from "./pages/signUpPage";
import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from './components/siteHeader';
import UpcomingMoviesPage from "./pages/upcomingMoviesPage";
import TopRatedMoviesPage from "./pages/topRatedPage";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools'
import MoviesContextProvider from "./contexts/moviesContext";
import AddMovieReviewPage from './pages/addMovieReviewPage';
import TvDetailPage from "./pages/tvDetailsPage";
import TvPage from './pages/tvPage';
import NowPlayingPage from "./pages/NowPlayingPage";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000, 
      refetchOnWindowFocus: false
    },
  },
});





const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
    <SiteHeader />      {/* New Header  */}
    <MoviesContextProvider>
            {" "}
      <Switch>
      <Route exact path="/movies/now-playing" component={NowPlayingPage} />
      <Route exact path="/movies/top-rated" component={TopRatedMoviesPage} />
      <Route exact path="/reviews/form" component={AddMovieReviewPage} />
      <Route exact path="/tv/discovertv" component={TvPage} />
      <Route exact path="/movies/upcoming" component={UpcomingMoviesPage} />
      <Route path="/reviews/:id" component={MovieReviewPage} />
        <Route exact path="/movies/favorites" component={FavoriteMoviesPage} />
        <Route path="/movies/:id" component={MoviePage} />
        <Route exact path="/" component={HomePage} />
        <Route path="/tv/:id" component={TvDetailPage} />
       
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/signup" component={signUpPage} />
        <Redirect from="*" to="/" />
      </Switch>
      </MoviesContextProvider>
    </BrowserRouter>
    <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));