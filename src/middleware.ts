import { clerkMiddleware } from "@clerk/nextjs/server";

export const config = {
  matcher: ["/(admin)(.*)"],
};

export default clerkMiddleware();
