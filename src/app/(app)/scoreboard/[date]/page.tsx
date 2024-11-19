import * as React from "react";
import prisma from "@/lib/prisma";
import { format, parse, isValid } from "date-fns";
import { TypographyLarge } from "@/components/ui/typography";
import { ScoreboardQueryBuilder } from "@/lib/nbaApi";
import { InputJsonValue } from "@prisma/client/runtime/library";
import AppBreadcrumbs from "@/components/app-breadcrumbs";
import { validateNBAScoreboard, Event } from "@/lib/types/nbaScoreboard";
import { toResult } from "@/lib/toResult";
import { match, P } from "ts-pattern";
import { Badge } from "@/components/ui/badge";
import { CheckIcon, ExternalLinkIcon } from "lucide-react";
import { TZDate } from "@date-fns/tz";

const getScoreboard = async (date?: string) => {
  const data = await prisma.scoreboardSummary.findUnique({
    select: { json: true },
    where: { date },
  });

  const existingScoreboard = toResult(() =>
    validateNBAScoreboard(data?.json)
  ).fold(
    () => undefined,
    (s) => s
  );
  const allComplete =
    existingScoreboard?.events.every((e) => e.status.type.completed) ?? false;

  const scoreboard = await match({
    existingScoreboard,
    allComplete,
    date,
  })
    .with(
      { existingScoreboard: P.nonNullable, allComplete: true },
      ({ existingScoreboard }) => existingScoreboard
    )
    .with(
      { date: P.string },
      async ({ date }) =>
        await fetchAndSaveScoreboardSummary(date).then((s) =>
          validateNBAScoreboard(s.json)
        )
    )
    .otherwise(() => {
      throw new Error("No date provided");
    });

  return scoreboard;
};

const fetchAndSaveScoreboardSummary = async (date: string) => {
  const data = await ScoreboardQueryBuilder.getQueryFn({ dates: date })();
  return prisma.scoreboardSummary.upsert({
    where: { date },
    create: { date, json: data as unknown as InputJsonValue },
    update: { json: data as unknown as InputJsonValue },
  });
};

const PARSE_DATE_FORMAT = "yyyyMMdd";
const DATE_FORMAT = "MMMM d, yyyy";

export default async function ScoreboardDate({
  params,
}: {
  params: Promise<{ date: string }>;
}) {
  const dateParam = (await params).date;
  if (!dateParam || !dateParam.match(/^\d{8}$/))
    throw new Error("Invalid date format");

  const data = (await getScoreboard(dateParam)).events;

  const date = parse(dateParam, PARSE_DATE_FORMAT, new TZDate());
  if (!isValid(date)) {
    throw new Error("Invalid date format");
  }

  return (
    <>
      <AppBreadcrumbs
        page={format(date, DATE_FORMAT)}
        links={[{ label: "Scoreboard", href: "/scoreboard" }]}
      />
      <div className="flex flex-1 flex-col gap-4 p-4">
        {data?.map((scoreboardEvent) => (
          <ScoreboardEvent key={scoreboardEvent.id} event={scoreboardEvent} />
        ))}
      </div>
    </>
  );
}

const ScoreboardEvent = ({
  event,
}: React.PropsWithChildren<{ event: Event }>) => {
  console.log(event);
  return (
    <div className="aspect-video h-12 w-full rounded-lg p-2 bg-muted/50 flex gap-1 items-center justify-between">
      <div className="flex gap-1 items-center">
        <TypographyLarge>{event.name}</TypographyLarge>
        <a
          href={`https://www.espn.com/nba/game/_/gameId/${event.id}`}
          target="_blank"
          aria-label="View on ESPN"
          rel="noreferrer"
          className="hover:text-gray-500 transition-colors"
        >
          <ExternalLinkIcon size={16} />
        </a>
      </div>

      <div className="flex gap-1 items-center">
        {event.status.type.completed ? (
          <Badge variant="secondary" className="flex gap-1 items-center">
            <span>Completed</span>
            <CheckIcon size={16} className="text-green-500" />
          </Badge>
        ) : (
          <Badge variant="default" className="animate-pulse">
            In Progress
          </Badge>
        )}
      </div>
    </div>
  );
};
