import { z } from "zod";

// Basic schemas
export const LinkSchema = z.object({
  rel: z.array(z.string()),
  href: z.string().url(),
  text: z.string().optional(),
  isExternal: z.boolean().optional(),
  isPremium: z.boolean().optional(),
});

export const LogoSchema = z.object({
  href: z.string().url(),
  width: z.number(),
  height: z.number(),
  alt: z.string(),
  rel: z.array(z.string()),
  lastUpdated: z.string(),
});

const SeasonTypeSchema = z.object({
  id: z.string(),
  type: z.number(),
  name: z.string(),
  abbreviation: z.string(),
});

const SeasonSchema = z.object({
  year: z.number(),
  startDate: z.string(),
  endDate: z.string(),
  displayName: z.string(),
  type: SeasonTypeSchema,
});

const VenueSchema = z.object({
  id: z.string(),
  fullName: z.string(),
  address: z.object({
    city: z.string(),
    state: z.string(),
  }),
  indoor: z.boolean(),
});

const TeamSchema = z.object({
  id: z.string(),
  uid: z.string(),
  location: z.string(),
  name: z.string(),
  abbreviation: z.string(),
  displayName: z.string(),
  shortDisplayName: z.string(),
  color: z.string(),
  alternateColor: z.string(),
  isActive: z.boolean(),
  venue: z.object({ id: z.string() }),
  links: z.array(LinkSchema),
  logo: z.string().url(),
});

const AthleteSchema = z.object({
  id: z.string(),
  fullName: z.string(),
  displayName: z.string(),
  shortName: z.string(),
  links: z.array(LinkSchema),
  headshot: z.string().url(),
  jersey: z.string(),
  position: z.object({
    abbreviation: z.string(),
  }),
  team: z.object({
    id: z.string(),
  }),
  active: z.boolean(),
});

const LeaderSchema = z.object({
  displayValue: z.string(),
  value: z.number(),
  athlete: AthleteSchema,
  team: z.object({
    id: z.string(),
  }),
});

const StatisticSchema = z.object({
  name: z.string(),
  abbreviation: z.string(),
  displayValue: z.string(),
});

const CompetitorSchema = z.object({
  id: z.string(),
  uid: z.string(),
  type: z.string(),
  order: z.number(),
  homeAway: z.string(),
  team: TeamSchema,
  score: z.string(),
  linescores: z.array(z.object({ value: z.number() })).optional(),
  statistics: z.array(StatisticSchema),
  leaders: z.array(
    z.object({
      name: z.string(),
      displayName: z.string(),
      shortDisplayName: z.string(),
      abbreviation: z.string(),
      leaders: z.array(LeaderSchema),
    })
  ),
  records: z.array(
    z.object({
      name: z.string(),
      abbreviation: z.string().optional(),
      type: z.string(),
      summary: z.string(),
    })
  ),
});

const CompetitionSchema = z.object({
  id: z.string(),
  uid: z.string(),
  date: z.string(),
  attendance: z.number(),
  type: z.object({
    id: z.string(),
    abbreviation: z.string(),
  }),
  timeValid: z.boolean(),
  neutralSite: z.boolean(),
  conferenceCompetition: z.boolean(),
  playByPlayAvailable: z.boolean(),
  recent: z.boolean(),
  venue: VenueSchema,
  competitors: z.array(CompetitorSchema),
  status: z.object({
    clock: z.number(),
    displayClock: z.string(),
    period: z.number(),
    type: z.object({
      id: z.string(),
      name: z.string(),
      state: z.string(),
      completed: z.boolean(),
      description: z.string(),
      detail: z.string(),
      shortDetail: z.string(),
    }),
  }),
  broadcasts: z.array(
    z.object({
      market: z.string(),
      names: z.array(z.string()),
    })
  ),
});

const EventSchema = z.object({
  id: z.string(),
  uid: z.string(),
  date: z.string(),
  name: z.string(),
  shortName: z.string(),
  season: z.object({
    year: z.number(),
    type: z.number(),
    slug: z.string(),
  }),
  competitions: z.array(CompetitionSchema),
  status: z.object({
    clock: z.number(),
    displayClock: z.string(),
    period: z.number(),
    type: z.object({
      id: z.string(),
      name: z.string(),
      state: z.string(),
      completed: z.boolean(),
      description: z.string(),
      detail: z.string(),
      shortDetail: z.string(),
    }),
  }),
});

// Main Schema
export const NBAScoreboardSchema = z.object({
  leagues: z.array(
    z.object({
      id: z.string(),
      uid: z.string(),
      name: z.string(),
      abbreviation: z.string(),
      slug: z.string(),
      season: SeasonSchema,
      logos: z.array(LogoSchema),
      calendarType: z.string(),
      calendarIsWhitelist: z.boolean(),
      calendarStartDate: z.string(),
      calendarEndDate: z.string(),
      calendar: z.array(z.string()),
    })
  ),
  season: z
    .object({
      type: z.number(),
      year: z.number(),
    })
    .optional(),
  day: z
    .object({
      date: z.string(),
    })
    .optional(),
  events: z.array(EventSchema),
});

// Type inference
export type NBAScoreboard = z.infer<typeof NBAScoreboardSchema>;
export type Event = z.infer<typeof EventSchema>;
export type Competition = z.infer<typeof CompetitionSchema>;
export type Competitor = z.infer<typeof CompetitorSchema>;
export type Team = z.infer<typeof TeamSchema>;
export type Athlete = z.infer<typeof AthleteSchema>;
export type Logo = z.infer<typeof LogoSchema>;

// Validator function
export const validateNBAScoreboard = (data: unknown): NBAScoreboard => {
  return NBAScoreboardSchema.parse(data);
};
