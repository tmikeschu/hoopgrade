import CopyEventJson from "@/components/copy-event-json";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function EventJsonPage() {
  const { userId } = await auth();
  if (!userId) return redirect("/admin");

  return <CopyEventJson />;
}
