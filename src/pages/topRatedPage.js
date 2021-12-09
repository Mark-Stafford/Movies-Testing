import React from "react";
import PageTemplate from "../components/templateMovieListPage";
import { useQuery } from 'react-query'
import Spinner from '../components/spinner'
import {getTopRatedMovies} from '../api/tmdb-api'
import  AddToFavouriteIcon from "../components/cardIcons/addToFavorites"

//top rated page movies
const TopRatedMoviesPage = (props) => {
  const {  data, error, isLoading, isError }  = useQuery('top-rated', getTopRatedMovies)

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  const movies = data.results;

   
//adding top rated movies to favs
  return (
    <PageTemplate
      title="Top Rated Movies"
      movies={movies}
      action={(movie) => {
        return <AddToFavouriteIcon movie={movie} />
      }}
    />
);
};

export default TopRatedMoviesPage;