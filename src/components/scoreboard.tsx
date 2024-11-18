"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { useRouter } from "next/navigation";

export default function Scoreboard() {
  const router = useRouter();

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <Calendar
        mode="single"
        onSelect={(date) =>
          date && router.push(`/scoreboard/${format(date, "yyyyMMdd")}`)
        }
        initialFocus
      />
    </div>
  );
}
