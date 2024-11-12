// https://site.web.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard

import { Event, GameEvent, League, Logo } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

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

export const ScoreboardQueryBuilder = {
  getQueryKey: (params: Partial<ScoreboardParams> = {}) => [
    "scoreboard",
    params,
  ],
  getQueryFn: (params: Partial<ScoreboardParams> = {}) => {
    return async () => {
      const queryString = toQueryString(params);

      const response = await fetch(
        `${BASE_ESPN_API_URL}${V2_PATH}${SCOREBOARD_PATH}?${queryString}`
      );
      return response.json() as Promise<ScoreboardResponse>;
    };
  },
};

export const useScoreboardQuery = (params: Partial<ScoreboardParams> = {}) => {
  return useQuery({
    queryKey: ScoreboardQueryBuilder.getQueryKey(params),
    queryFn: ScoreboardQueryBuilder.getQueryFn(params),
  });
};

export type SummaryParams = {
  region?: string;
  lang?: string;
  contentorigin?: string;
  event: number;
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

const toQueryString = <R extends Record<string, unknown>>(params: R) => {
  return Object.entries(params)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
};

export const SummaryQueryBuilder = {
  queryKey: (params: Partial<SummaryParams>) => ["summary", params],
  queryFn: async (params: Partial<SummaryParams>) => {
    const queryString = toQueryString(params);

    const response = await fetch(
      `${BASE_ESPN_API_URL}${V2_PATH}${SUMMARY_PATH}?${queryString}`
    );
    return response.json() as Promise<SummaryResponse>;
  },
};

export const useSummaryQuery = (params: Partial<SummaryParams>) => {
  return useQuery({
    queryKey: SummaryQueryBuilder.queryKey(params),
    queryFn: () => SummaryQueryBuilder.queryFn(params),
  });
};
