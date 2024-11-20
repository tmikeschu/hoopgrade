import { auth, currentUser } from "@clerk/nextjs/server";

export default async function AdminPage() {
  const { userId } = await auth();

  if (!userId) return null;

  const user = await currentUser();

  return <div>Admin {user?.emailAddresses[0].emailAddress}</div>;
}
