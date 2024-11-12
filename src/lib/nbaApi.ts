// https://site.web.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard

import { GameEvent, League, Logo, NBAGameData } from "@/lib/types";

export const BASE_ESPN_API_URL = "https://site.web.api.espn.com";

export const V2_PATH = "/apis/site/v2";

export type ScoreboardParams = {
  region: string;
  lang: string;
  contentorigin: string;
  limit: number;
  calendartype: string;
  includeModules: string;
  dates: string;
  tz: string;
};

export interface ScoreboardResponse {
  leagues: League[];
  season: {
    type: number;
    year: number;
  };
  day: {
    date: string;
  };
  events: Event[];
}

export const SCOREBOARD_PATH = "/sports/basketball/nba/scoreboard";

export type SummaryParams = {
  region: string;
  lang: string;
  contentorigin: string;
  event: string;
};

export type SummaryResponse = {
  sports: {
    id: string;
    uid: string;
    name: string;
    slug: string;
    logos: Logo[];
    leagues: {
      id: string;
      uid: string;
      name: string;
      abbreviation: string;
      shortName: string;
      slug: string;
      events: GameEvent[];
    }[];
  }[];
};

export const SUMMARY_PATH = "/sports/basketball/nba/summary";
