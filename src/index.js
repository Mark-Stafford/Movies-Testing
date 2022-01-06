
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import ReactDOM from "react-dom";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import FavoriteMoviesPage from "./pages/favoriteMoviesPage"; // NEW
import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from './components/siteHeader';
import UpcomingMoviesPage from "./pages/upcomingMoviesPage";
import TopRatedMoviesPage from "./pages/topRatedPage";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools'
import MoviesContextProvider from "./contexts/moviesContext";
import PrivateRoute from "./privateRoute";
import AddMovieReviewPage from './pages/addMovieReviewPage';
import LoginPage from "./pages/LoginPage";
import TvDetailPage from "./pages/tvDetailsPage";
import TvPage from './pages/tvPage';
import NowPlayingPage from "./pages/NowPlayingPage";

import AuthProvider from "./contexts/authContext";
import signUpPage from "./pages/signUpPage";
import AuthHeader from "./authHeader";

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
      
    <AuthProvider>
    <SiteHeader /> 
    <AuthHeader />      {/* New Header  */}
    <MoviesContextProvider>
            {" "}
      <Switch>
      <Route exact path="/movies/now-playing" component={NowPlayingPage} />
      <PrivateRoute exact path="/top-rated" component={TopRatedMoviesPage} />
      <Route exact path="/reviews/form" component={AddMovieReviewPage} />
      <Route exact path="/discovertv" component={TvPage} />
      <PrivateRoute exact path="/upcoming" component={UpcomingMoviesPage} />
      <Route path="/reviews/:id" component={MovieReviewPage} />
        <Route exact path="/movies/favorites" component={FavoriteMoviesPage} />
        <Route path="/movies/:id" component={MoviePage} />
        
        <Route exact path="/" component={HomePage} />
        <Route path="/tv/:id" component={TvDetailPage} />
       
        <Route exact path="/login" component={LoginPage} /> 
        <Route exact path="/signup" component={signUpPage} />
        <Redirect from="*" to="/login" />
      </Switch>
      </MoviesContextProvider>
      </AuthProvider>
    </BrowserRouter>
    <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));