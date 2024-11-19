import { z } from "zod";
import { LinkSchema, LogoSchema } from "./nbaScoreboard";

const SportLogoSchema = z.object({
  href: z.string().url(),
  alt: z.string(),
  rel: z.array(z.string()),
  width: z.number(),
  height: z.number(),
});

const BroadcastSchema = z.object({
  typeId: z.number(),
  priority: z.number(),
  type: z.string(),
  isNational: z.boolean(),
  broadcasterId: z.number(),
  broadcastId: z.number(),
  name: z.string(),
  shortName: z.string(),
  callLetters: z.string(),
  station: z.string(),
  lang: z.string(),
  region: z.string(),
  slug: z.string(),
});

const OddsProviderLogoSchema = z.object({
  href: z.string().url(),
  rel: z.array(z.string()),
});

const OddsProviderSchema = z.object({
  id: z.string(),
  name: z.string(),
  priority: z.number(),
  logos: z.array(OddsProviderLogoSchema),
});

const TeamOddsSchema = z.object({
  favorite: z.boolean(),
  favoriteAtOpen: z.boolean(),
  underdog: z.boolean(),
  moneyLine: z.number(),
  spreadOdds: z.number(),
  team: z.object({
    id: z.string(),
    abbreviation: z.string(),
    displayName: z.string(),
    name: z.string(),
  }),
});

const OddsSchema = z.object({
  details: z.string(),
  overUnder: z.number(),
  spread: z.number(),
  overOdds: z.number(),
  underOdds: z.number(),
  provider: OddsProviderSchema,
  home: z.object({
    moneyLine: z.number(),
  }),
  away: z.object({
    moneyLine: z.number(),
  }),
  awayTeamOdds: TeamOddsSchema,
  homeTeamOdds: TeamOddsSchema,
});

const RecordStatsSchema = z.object({
  wins: z.object({ value: z.number() }),
  losses: z.object({ value: z.number() }),
  ties: z.object({ value: z.number() }),
  OTWins: z.object({ value: z.number() }),
  OTLosses: z.object({ value: z.number() }),
  points: z.object({ value: z.number() }),
  pointsFor: z.object({ value: z.number() }),
  pointsAgainst: z.object({ value: z.number() }),
  avgPointsFor: z.object({ value: z.number() }),
  avgPointsAgainst: z.object({ value: z.number() }),
  gamesPlayed: z.object({ value: z.number() }),
  winPercent: z.object({ value: z.number() }),
  leagueWinPercent: z.object({ value: z.number() }),
  divisionWins: z.object({ value: z.number() }),
  divisionLosses: z.object({ value: z.number() }),
  divisionTies: z.object({ value: z.number() }),
  divisionWinPercent: z.object({ value: z.number() }),
  streak: z.object({ value: z.number() }),
  playoffSeed: z.object({ value: z.number() }),
  gamesBehind: z.object({ value: z.number() }),
  conferenceWins: z.object({ value: z.number() }),
  conferenceLosses: z.object({ value: z.number() }),
  conferenceTies: z.object({ value: z.number() }),
});

const CompetitorSummarySchema = z.object({
  id: z.string(),
  uid: z.string(),
  type: z.string(),
  order: z.number(),
  homeAway: z.string(),
  winner: z.boolean(),
  displayName: z.string(),
  name: z.string(),
  abbreviation: z.string(),
  location: z.string(),
  color: z.string(),
  alternateColor: z.string(),
  score: z.string(),
  links: z.array(LinkSchema),
  records: z.array(
    z.object({
      name: z.string(),
      type: z.string(),
      summary: z.string(),
    })
  ),
  record: z.string(),
  recordStats: RecordStatsSchema,
  logo: z.string().url(),
  logoDark: z.string().url().optional(),
});

const EventSummarySchema = z.object({
  id: z.string(),
  uid: z.string(),
  date: z.string(),
  timeValid: z.boolean(),
  recent: z.boolean(),
  name: z.string(),
  shortName: z.string(),
  seriesSummary: z.string(),
  links: z.array(LinkSchema),
  gamecastAvailable: z.boolean(),
  playByPlayAvailable: z.boolean(),
  commentaryAvailable: z.boolean(),
  onWatch: z.boolean(),
  competitionId: z.string(),
  location: z.string(),
  season: z.number(),
  seasonStartDate: z.string(),
  seasonEndDate: z.string(),
  seasonType: z.string(),
  seasonTypeHasGroups: z.boolean(),
  group: z.object({
    groupId: z.string(),
    name: z.string(),
    abbreviation: z.string(),
    shortName: z.string(),
  }),
  week: z.number(),
  weekText: z.string(),
  link: z.string().url(),
  status: z.string(),
  summary: z.string(),
  period: z.number(),
  clock: z.string(),
  broadcasts: z.array(BroadcastSchema),
  broadcast: z.string(),
  odds: OddsSchema.optional(),
  competitors: z.array(CompetitorSummarySchema),
  watch: z.object({}),
  neutralSite: z.boolean(),
  appLinks: z.array(LinkSchema),
});

const LeagueSummarySchema = z.object({
  id: z.string(),
  uid: z.string(),
  name: z.string(),
  abbreviation: z.string(),
  shortName: z.string(),
  slug: z.string(),
  tag: z.string(),
  isTournament: z.boolean(),
  smartdates: z.array(z.string()),
  events: z.array(EventSummarySchema),
});

const SportSchema = z.object({
  id: z.string(),
  uid: z.string(),
  guid: z.string(),
  name: z.string(),
  slug: z.string(),
  logos: z.array(SportLogoSchema),
  leagues: z.array(LeagueSummarySchema),
});

// Main Schema
export const NBASummarySchema = z.object({
  sports: z.array(SportSchema),
});

// Type inference
export type NBASummary = z.infer<typeof NBASummarySchema>;
export type Sport = z.infer<typeof SportSchema>;
export type LeagueSummary = z.infer<typeof LeagueSummarySchema>;
export type EventSummary = z.infer<typeof EventSummarySchema>;
export type CompetitorSummary = z.infer<typeof CompetitorSummarySchema>;
export type Odds = z.infer<typeof OddsSchema>;
export type RecordStats = z.infer<typeof RecordStatsSchema>;

// Validator function
export const validateNBASummary = (data: unknown): NBASummary => {
  return NBASummarySchema.parse(data);
};
