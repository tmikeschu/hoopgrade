"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tooltip } from "@/components/ui/tooltip";
import {
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import {
  AlertTriangleIcon,
  CheckIcon,
  ClipboardIcon,
  Loader2Icon,
  XIcon,
} from "lucide-react";
import { useRef, useState } from "react";
import { match, P } from "ts-pattern";

const ESPN_API_URL =
  "https://site.web.api.espn.com/apis/site/v2/sports/basketball/nba/summary";

const IGNORE_KEYS = [
  "broadcasts",
  "predictor",
  "pickcenter",
  "againstTheSpread",
  "odds",
  "winprobability",
  "header",
  "news",
  "videos",
  "shop",
  "standings",
];

export default function CopyEventJson() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<
    "idle" | "copied" | "copying" | { status: "error"; message: string }
  >("idle");

  const handleCopyEventJson = async () => {
    try {
      setStatus("copying");
      const value = inputRef.current?.value;
      const eventId = match(value)
        .with(P.string.includes("espn.com"), (value) => {
          const url = new URL(value);
          return url.searchParams.get("event");
        })
        .otherwise((v) => v);

      if (!eventId) {
        setStatus({ status: "error", message: "Invalid event ID" });
        return;
      }

      const res = await fetch(
        `${ESPN_API_URL}?region=us&lang=en&contentorigin=espn&event=${eventId}`
      );

      const data = await res.json();
      const filteredData = Object.fromEntries(
        Object.entries(data).filter(([key]) => !IGNORE_KEYS.includes(key))
      );
      await window.navigator.clipboard.writeText(JSON.stringify(filteredData));
      setStatus("copied");
    } catch (e) {
      setStatus({
        status: "error",
        message: e instanceof Error ? e.message : "Unknown error",
      });
    }
  };

  return (
    <div className="p-4 max-w-md w-full flex gap-2">
      <Input
        type="text"
        placeholder="Event ID or URL"
        ref={inputRef}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleCopyEventJson();
          }
        }}
      />

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Button onClick={handleCopyEventJson} variant="ghost" size="icon">
              {match(status)
                .with("copied", () => <CheckIcon className="text-green-500" />)
                .with("copying", () => (
                  <Loader2Icon className="text-blue-500" />
                ))
                .with({ status: "error" }, () => (
                  <AlertTriangleIcon className="text-red-500" />
                ))
                .otherwise(() => (
                  <ClipboardIcon />
                ))}
            </Button>
          </TooltipTrigger>

          <TooltipContent>
            <Badge>
              {match(status)
                .with("copied", () => "Copied!")
                .with({ status: "error" }, ({ message }) => message)
                .with("copying", () => "Fetching data...")
                .otherwise(() => "Copy event JSON")}
            </Badge>
          </TooltipContent>
        </Tooltip>

        {status === "copied" ? (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              inputRef.current!.value = "";
              setStatus("idle");
            }}
          >
            <XIcon />
          </Button>
        ) : null}
      </TooltipProvider>
    </div>
  );
}
