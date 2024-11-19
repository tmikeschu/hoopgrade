import * as React from "react";
import prisma from "@/lib/prisma";
import { format } from "date-fns";
import { TypographyLarge } from "@/components/ui/typography";
import { ScoreboardQueryBuilder, ScoreboardResponse } from "@/lib/nbaApi";
import { InputJsonValue } from "@prisma/client/runtime/library";
import AppBreadcrumbs from "@/components/app-breadcrumbs";
import { validateNBAScoreboard, Event } from "@/lib/types/nbaScoreboard";

const getScoreboard = async (date?: string) => {
  let data = await prisma.scoreboardSummary.findUnique({
    select: { json: true },
    where: { date },
  });

  if (!data && date) {
    // check for all completed games
    data = await fetchAndSaveScoreboardSummary(date);
  }

  const scoreboard = validateNBAScoreboard(data?.json);

  return scoreboard;
};

const fetchAndSaveScoreboardSummary = async (date: string) => {
  const data = await ScoreboardQueryBuilder.getQueryFn({ dates: date })();
  return prisma.scoreboardSummary.create({
    data: { date, json: data as unknown as InputJsonValue },
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
    <div className="aspect-video h-12 w-full rounded-lg p-2 bg-muted/50 flex items-center">
      <TypographyLarge>{event.name}</TypographyLarge>
    </div>
  );
};
