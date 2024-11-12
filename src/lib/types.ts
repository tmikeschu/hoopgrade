export interface League {
  id: string;
  uid: string;
  name: string;
  abbreviation: string;
  slug: string;
  season: Season;
  logos: Logo[];
  calendarType: string;
  calendarIsWhitelist: boolean;
  calendarStartDate: string;
  calendarEndDate: string;
  calendar: string[];
}

export interface Season {
  year: number;
  startDate: string;
  endDate: string;
  displayName: string;
  type: SeasonType;
}

export interface SeasonType {
  id: string;
  type: number;
  name: string;
  abbreviation: string;
}

export interface Logo {
  href: string;
  width: number;
  height: number;
  alt: string;
  rel?: string[];
  lastUpdated?: string;
  title?: string;
  description?: string;
}

export interface Event {
  id: string;
  uid: string;
  date: string;
  name: string;
  shortName: string;
  season: Season;
  competitions: Competition[];
  notes: any[];
  situation: Situation;
  status: EventStatus;
  broadcasts: Broadcast[];
  format: Format;
  startDate: string;
  broadcast: string;
  geoBroadcasts: GeoBroadcast[];
  highlights: any[];
}

export interface Competition {
  id: string;
  uid: string;
  date: string;
  attendance: number;
  type: CompetitionType;
  timeValid: boolean;
  neutralSite: boolean;
  conferenceCompetition: boolean;
  playByPlayAvailable: boolean;
  recent: boolean;
  venue: Venue;
  competitors: Competitor[];
  records: StatRecord[];
}

export interface CompetitionType {
  id: string;
  abbreviation: string;
}

export interface Venue {
  id: string;
  fullName: string;
  address: Address;
  indoor: boolean;
}

export interface Address {
  city: string;
  state: string;
}

export interface Team {
  id: string;
  uid: string;
  location: string;
  name: string;
  abbreviation: string;
  displayName: string;
  shortDisplayName: string;
  color: string;
  alternateColor: string;
  isActive: boolean;
  venue: VenueReference;
  links: Link[];
  logo: string;
}

export interface VenueReference {
  id: string;
}

export interface Link {
  language?: string;
  rel?: string[];
  href: string;
  text: string;
  shortText?: string;
  isExternal?: boolean;
  isPremium?: boolean;
  properties?: {
    breakpoints?: string;
  };
}

export interface LineScore {
  value: number;
}

export interface Statistic {
  name: string;
  abbreviation: string;
  displayValue: string;
}

export interface Leader {
  name: string;
  displayName: string;
  shortDisplayName: string;
  abbreviation: string;
  leaders: PlayerLeader[];
}

export interface PlayerLeader {
  displayValue: string;
  value: number;
  athlete: Athlete;
  team: TeamReference;
}

export interface Athlete {
  id: string;
  fullName: string;
  displayName: string;
  shortName: string;
  links: Link[];
  headshot: string;
  jersey: string;
  position: Position;
  team: TeamReference;
  active: boolean;
}

export interface Position {
  abbreviation: string;
}

export interface TeamReference {
  id: string;
}

export interface StatRecord {
  name: string;
  abbreviation: string;
  type: string;
  summary: string;
}

export interface Situation {
  lastPlay: LastPlay;
}

export interface LastPlay {
  id: string;
  type: PlayType;
  text: string;
  scoreValue: number;
  team: TeamReference;
  probability: Probability;
  athletesInvolved: AthleteInvolved[];
}

export interface PlayType {
  id: string;
  text: string;
}

export interface Probability {
  tiePercentage: number;
  homeWinPercentage: number;
  awayWinPercentage: number;
}

export interface AthleteInvolved {
  id: string;
  fullName: string;
  displayName: string;
  shortName: string;
  links: Link[];
  headshot: string;
  jersey: string;
  position: string;
  team: TeamReference;
}

export interface EventStatus {
  clock: number;
  displayClock: string;
  period: number;
  type: StatusType;
}

export interface StatusType {
  id: string;
  name: string;
  state: string;
  completed: boolean;
  description: string;
  detail: string;
  shortDetail: string;
}

export interface Broadcast {
  market?: string;
  names?: string[];
  typeId?: number;
  priority?: number;
  type?: string;
  isNational?: boolean;
  broadcasterId?: number;
  broadcastId?: number;
  name?: string;
  shortName?: string;
  callLetters?: string;
  station?: string;
  lang?: string;
  region?: string;
  slug?: string;
}

export interface Format {
  regulation: Regulation;
}

export interface Regulation {
  periods: number;
}

export interface GeoBroadcast {
  type: BroadcastType;
  market: BroadcastMarket;
  media: Media;
  lang: string;
  region: string;
}

export interface BroadcastType {
  id: string;
  shortName: string;
}

export interface BroadcastMarket {
  id: string;
  type: string;
}

export interface Media {
  shortName: string;
}

export interface RootObject {
  leagues: League[];
  season: { type: number; year: number };
  day: { date: string };
  events: Event[];
  links: Link[];
  status: EventStatus;
}

// Types for basic data structures
export type TeamAbbreviation =
  | "ATL"
  | "BOS"
  | "BKN"
  | "CHA"
  | "CHI"
  | "CLE"
  | "DAL"
  | "DEN"
  | "DET"
  | "GSW"
  | "HOU"
  | "IND"
  | "LAC"
  | "LAL"
  | "MEM"
  | "MIA"
  | "MIL"
  | "MIN"
  | "NOP"
  | "NYK"
  | "OKC"
  | "ORL"
  | "PHI"
  | "PHX"
  | "POR"
  | "SAC"
  | "SAS"
  | "TOR"
  | "UTA"
  | "WAS"
  | string; // fallback for any other abbreviations

// Interface for team logos

// Interface for odds provider
export interface OddsProvider {
  id: string;
  name: string;
  priority: number;
  logos: Logo[];
}

// Interface for betting odds
export interface TeamOdds {
  favorite: boolean;
  favoriteAtOpen: boolean;
  underdog: boolean;
  moneyLine: number;
  spreadOdds: number;
  team: {
    id: string;
    abbreviation: TeamAbbreviation;
    displayName: string;
    name: string;
  };
}

// Interface for game situation
export interface GameSituation {
  lastPlay: {
    id: string;
    type: {
      id: string;
      text: string;
    };
    text: string;
    shortText: string;
    period: {
      number: number;
    };
    clock: {
      value: number;
      displayValue: string;
    };
    team: {
      id: string;
    };
    scoreValue: number;
    probability?: {
      awayWinPercentage: number;
      homeWinPercentage: number;
      tiePercentage: number;
    };
  };
}

// Interface for team record stats
export interface TeamRecordStats {
  wins: { value: number };
  losses: { value: number };
  ties: { value: number };
  OTWins: { value: number };
  OTLosses: { value: number };
  points: { value: number };
  pointsFor: { value: number };
  pointsAgainst: { value: number };
  avgPointsFor: { value: number };
  avgPointsAgainst: { value: number };
  gamesPlayed: { value: number };
  winPercent: { value: number };
  leagueWinPercent: { value: number };
  streak: { value: number };
  [key: string]: { value: number };
}

// Interface for team competitor
export interface Competitor {
  id: string;
  uid: string;
  type: string;
  order: number;
  homeAway: HomeAway;
  winner: boolean;
  displayName: string;
  name: string;
  abbreviation: TeamAbbreviation;
  location: string;
  color: string;
  alternateColor: string;
  score: string;
  links: Link[];
  records: any[];
  record: string;
  recordStats: TeamRecordStats;
  logo: string;
  logoDark: string;
}

// Main interface for game event
export interface GameEvent {
  id: string;
  uid: string;
  date: string;
  timeValid: boolean;
  recent: boolean;
  name: string;
  shortName: string;
  links: Link[];
  gamecastAvailable: boolean;
  playByPlayAvailable: boolean;
  commentaryAvailable: boolean;
  location: string;
  status: GameStatus;
  period: number;
  clock: string;
  broadcasts: Broadcast[];
  competitors: Competitor[];
  situation: GameSituation;
  odds?: {
    provider: OddsProvider;
    awayTeamOdds: TeamOdds;
    homeTeamOdds: TeamOdds;
    details: string;
    overUnder: number;
    spread: number;
  };
}

// Merge all status types
export type GameStatus =
  | "scheduled"
  | "in"
  | "pre"
  | "post"
  | "postponed"
  | "canceled";

// HomeAway type remains the same as it's consistent
export type HomeAway = "home" | "away";
