import * as React from "react";
import prisma from "@/lib/prisma";
import { format } from "date-fns";
import { TypographyLarge } from "@/components/ui/typography";
import { ScoreboardQueryBuilder } from "@/lib/nbaApi";
import { InputJsonValue } from "@prisma/client/runtime/library";
import AppBreadcrumbs from "@/components/app-breadcrumbs";
import { validateNBAScoreboard, Event } from "@/lib/types/nbaScoreboard";
import { toResult } from "@/lib/toResult";
import { match, P } from "ts-pattern";
import { Badge } from "@/components/ui/badge";
import { CheckIcon, CircleDotIcon } from "lucide-react";

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

export default async function ScoreboardDate({
  params,
}: {
  params: Promise<{ date: string }>;
}) {
  const date = (await params).date;
  if (!date) throw new Error("Invalid date format");

  const data = (await getScoreboard(date)).events;

  return (
    <>
      <AppBreadcrumbs
        page={format(
          new Date(date.replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3")),
          "MMMM d, yyyy"
        )}
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
  return (
    <div className="aspect-video h-12 w-full rounded-lg p-2 bg-muted/50 flex gap-1 items-center justify-between">
      <TypographyLarge>{event.name}</TypographyLarge>

      <div className="flex gap-1 items-center">
        {event.status.type.completed ? (
          <>
            <Badge variant="secondary">Completed</Badge>
            <CheckIcon />
          </>
        ) : (
          <>
            <Badge variant="default">In Progress</Badge>
            <CircleDotIcon className="animate-pulse text-green-500" />
          </>
        )}
      </div>
    </div>
  );
};
