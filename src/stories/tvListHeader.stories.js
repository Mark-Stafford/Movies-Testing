import React from "react";
import TvListHeader from "../components/headerTvList";

export default {
  title: "Tv Page/Header",
  component: TvListHeader,
};

export const Basic = () => <TvListHeader title={'Discover Tv Shows'} />;

Basic.storyName = "Default";