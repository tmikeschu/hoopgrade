import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useScoreboardQuery } from "@/lib/nbaApi";
import { Event } from "@/lib/types";
import { TypographyLarge } from "@/components/ui/typography";

export default function Scoreboard() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  const { data } = useScoreboardQuery(
    date ? { dates: format(date, "yyyyMMdd") } : {}
  );

  return (
    <div>
      <div className="flex flex-1 flex-col gap-4 p-4">
        <DatePicker date={date} setDate={setDate} />

        {data?.events.map((scoreboardEvent) => (
          <ScoreboardEvent key={scoreboardEvent.id} event={scoreboardEvent} />
        ))}
      </div>
    </div>
  );
}

function DatePicker({
  date,
  setDate,
}: {
  date: Date | undefined;
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[240px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
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
