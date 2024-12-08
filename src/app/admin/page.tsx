import { currentUser } from "@clerk/nextjs/server";

export default async function AdminPage() {
  const user = await currentUser();

  return (
    <div className="p-4">Admin {user?.emailAddresses[0].emailAddress}</div>
  );
}
