import * as React from "react";
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import prisma from "@/lib/prisma";
import { Event } from "@/lib/types";
import { TypographyLarge } from "@/components/ui/typography";
import { ScoreboardQueryBuilder, ScoreboardResponse } from "@/lib/nbaApi";
import { InputJsonValue } from "@prisma/client/runtime/library";

const getScoreboard = async (date?: string) => {
  let data = await prisma.scoreboardSummary.findUnique({
    select: { json: true },
    where: { date },
  });

  if (!data && date) {
    data = await fetchAndSaveScoreboardSummary(date);
  }

  const scoreboard = data?.json as unknown as ScoreboardResponse;

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
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset suppressHydrationWarning>
        <header className="flex sticky top-0 bg-background h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/scoreboard">Scoreboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <BreadcrumbPage>{date}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        {data?.map((scoreboardEvent) => (
          <ScoreboardEvent key={scoreboardEvent.id} event={scoreboardEvent} />
        ))}
      </SidebarInset>
    </SidebarProvider>
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
