// https://site.web.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard

import {
  NBAScoreboard,
  validateNBAScoreboard,
} from "@/lib/types/nbaScoreboard";
import { NBASummary, validateNBASummary } from "@/lib/types/nbaSummary";

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

export type ScoreboardResponse = NBAScoreboard;

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
      return validateNBAScoreboard(await response.json());
    };
  },
};

export type SummaryParams = {
  region?: string;
  lang?: string;
  contentorigin?: string;
  event: number;
};

export type SummaryResponse = NBASummary;

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
    return validateNBASummary(await response.json());
  },
};
