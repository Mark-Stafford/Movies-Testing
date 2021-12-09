import React from "react";
import TvList from "../components/tvList";
import SampleMovie from "./sampleData1";
import { MemoryRouter } from "react-router";

import Grid from "@material-ui/core/Grid";
//import MoviesContextProvider from "../contexts/moviesContext";

export default {
  title: "Tv Page/TvList",
  component: TvList,
  decorators: [
    (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
   // (Story) => <MoviesContextProvider>{Story()}</MoviesContextProvider>,
  ],
};

export const Basic = () => {
  const tvs = [
    { ...SampleMovie, id: 1 },
    { ...SampleMovie, id: 2 },
    { ...SampleMovie, id: 3 },
    { ...SampleMovie, id: 4 },
    { ...SampleMovie, id: 5 },
  ];
  return (
    <Grid container spacing={5}>
      <TvList
       tvs={tvs}
       // action={(movie) => <AddToFavoritesIcon movie={movie} />}
      />
    </Grid>
  );
};
Basic.storyName = "Default";