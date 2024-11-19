import * as React from "react";
import { format, parse, isValid } from "date-fns";
import { TypographyLarge } from "@/components/ui/typography";
import AppBreadcrumbs from "@/components/app-breadcrumbs";
import { Event } from "@/lib/types/nbaScoreboard";
import { Badge } from "@/components/ui/badge";
import { CheckIcon, ExternalLinkIcon } from "lucide-react";
import { TZDate } from "@date-fns/tz";
import { getScoreboard } from "@/app/(app)/scoreboard/[date]/getScoreboard";

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
