import * as React from "react";
import Scoreboard from "@/components/scoreboard";
import AppBreadcrumbs from "@/components/app-breadcrumbs";

export default function ScoreboardRoute() {
  return (
    <>
      <AppBreadcrumbs page="Scoreboard" links={[]} />
      <Scoreboard />
    </>
  );
}
