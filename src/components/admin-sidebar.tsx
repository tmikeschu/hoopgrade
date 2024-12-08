import * as React from "react";
import { ChevronRight } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

const data = {
  navMain: [
    {
      title: "Home",
      items: [
        {
          title: "Dashboard",
          url: "/admin",
        },
        {
          title: "Event JSON",
          url: "/admin/event-json",
        },
      ],
    },
  ],
};

export function AdminSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SignedOut>
            <SidebarMenuItem>
              <div className="flex items-center gap-2 ">
                <Link
                  href="/admin"
                  className="flex items-center gap-2 hover:bg-sidebar-accent px-2 py-1 rounded"
                >
                  <div className="flex flex-col gap-0.5 leading-none">
                    <span className="font-semibold">Hoopgrade Admin</span>
                  </div>
                </Link>
                <div className="ml-auto">
                  <ThemeToggle />
                </div>
              </div>
            </SidebarMenuItem>
            <SignInButton>
              <Button>Sign In</Button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <SidebarMenuItem>
              <div className="flex items-center gap-2 ">
                <UserButton />
                <Link
                  href="/admin"
                  className="flex items-center gap-2 hover:bg-sidebar-accent px-2 py-1 rounded"
                >
                  <div className="flex flex-col gap-0.5 leading-none">
                    <span className="font-semibold">Hoopgrade Admin</span>
                  </div>
                </Link>
                <div className="ml-auto">
                  <ThemeToggle />
                </div>
              </div>
            </SidebarMenuItem>
          </SignedIn>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="gap-0">
        <SignedIn>
          {/* We create a collapsible SidebarGroup for each parent. */}
          {data.navMain.map((item) => (
            <Collapsible
              key={item.title}
              title={item.title}
              defaultOpen
              className="group/collapsible"
            >
              <SidebarGroup>
                <SidebarGroupLabel
                  asChild
                  className="group/label text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                >
                  <CollapsibleTrigger>
                    {item.title}{" "}
                    <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                  </CollapsibleTrigger>
                </SidebarGroupLabel>
                <CollapsibleContent>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {item.items.map((item) => (
                        <SidebarMenuItem key={item.title}>
                          <SidebarMenuButton asChild href={item.url}>
                            <Link href={item.url}>{item.title}</Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </CollapsibleContent>
              </SidebarGroup>
            </Collapsible>
          ))}
        </SignedIn>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
