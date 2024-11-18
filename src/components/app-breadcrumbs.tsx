"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";

export default function Breadcrumbs({
  page: pageProp,
  links: linksProp,
}: {
  page?: React.ReactNode;
  links: { label: string; href: string }[];
}) {
  const pathname = usePathname();
  const parts = pathname.split("/");
  const last = parts.pop() as string;

  const links =
    linksProp ??
    parts.reduce((acc: { label: string; href: string }[], part, i) => {
      if (i === 0) return [{ label: part, href: `/${part}` }];

      return [...acc, { label: part, href: `${acc[i - 1].href}/${part}` }];
    }, []);

  return (
    <header className="flex sticky top-0 bg-background h-16 shrink-0 items-center gap-2 border-b px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />
      <Breadcrumb>
        <BreadcrumbList>
          {links.map((part) => (
            <BreadcrumbItem key={part.href}>
              <BreadcrumbLink asChild>
                <Link href={part.href}>{part.label}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          ))}
          <BreadcrumbItem>
            <BreadcrumbPage>{pageProp ?? last}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </header>
  );
}
