"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useAppSelector } from "@/store/hooks";
import { usePathname } from "next/navigation";

export function SiteHeader() {
  const pathName = usePathname();
  const pathSegments = pathName.split("/").filter((segment) => segment);
  const currentPath = pathSegments.slice(1, pathSegments.length).join(" / ");
  const { user } = useAppSelector((state) => state.AuthSlice);
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium">{currentPath}</h1>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="ghost" asChild size="sm" className="hidden sm:flex">
            <span className="text-sm">Hello! {user?.name}</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
