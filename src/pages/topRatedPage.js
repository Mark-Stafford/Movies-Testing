import React from "react";
import PageTemplate from "../components/templateMovieListPage";
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import { getMovieTopRated } from "../api/tmdb-api";
import AddToPlaylistIcon from "../components/cardIcons/addToPlaylists";

const TopRatedMoviePage = (props) => {
  const {  data, error, isLoading, isError }  = useQuery('top-rated', getMovieTopRated)

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  const movies = data.results;

  // Redundant, but necessary to avoid app crashing.
  const playlists = movies.filter(m => m.playlists)
  localStorage.setItem('playlists', JSON.stringify(playlists))
  

  return (
    <PageTemplate
      title="Top Rated Movies"
      movies={movies}
      action={(movie) => {
        return <AddToPlaylistIcon movie={movie} />
      }}
    />
);
};

export default TopRatedMoviePage;