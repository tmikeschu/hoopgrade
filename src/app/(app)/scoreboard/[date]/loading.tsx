import { Skeleton } from "@/components/ui/skeleton";
import AppBreadcrumbs from "@/components/app-breadcrumbs";

export default function Loading() {
  return (
    <>
      <AppBreadcrumbs page={<Skeleton className="w-24 h-4" />} links={[]} />
      <div className="flex flex-1 flex-col gap-4 p-4">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="aspect-video h-12 w-full rounded-lg bg-muted/50 flex items-center"
          >
            <Skeleton className="w-full h-full" />
          </div>
        ))}
      </div>
    </>
  );
}
