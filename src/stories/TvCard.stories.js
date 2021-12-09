import React from "react";
import TvCard from "../components/tvCard";
import SampleTV from "./sampleData1";

export default {
  title: "Tv Page/TvCard",
  component: TvCard,
};

export const Basic = () => {
  return (
    <TvCard
      tv={SampleTV}
    />
  );
};
Basic.storyName = "Default";

export const Exceptional = () => {
  const sampleNoPoster = { ...SampleTV, poster_path: undefined };
  return (
    <TvCard
      tv={sampleNoPoster}
    />
  );
};
Exceptional.storyName = "exception";