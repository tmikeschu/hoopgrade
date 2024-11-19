import { ScoreboardQueryBuilder } from "@/lib/nbaApi";
import prisma from "@/lib/prisma";
import { toResult } from "@/lib/toResult";
import { validateNBAScoreboard } from "@/lib/types/nbaScoreboard";
import { InputJsonValue } from "@prisma/client/runtime/library";
import { match, P } from "ts-pattern";

export const getScoreboard = async (date?: string) => {
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
