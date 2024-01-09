"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useCreatorSidebar } from "@/store/use-creator-sidebar";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface NavItemProps {
  label: string;
  icon: LucideIcon;
  href: string;
  isActive: boolean;
}

export const NavItem = ({ label, icon: Icon, href, isActive }: NavItemProps) => {
  const { collapsed } = useCreatorSidebar((state) => state);
  return (
    <Button
      asChild
      variant="ghost"
      className={cn("w-full h-12", collapsed ? "justify-center" : "justify-start", isActive && "bg-accent")}
    >
      <Link href={href}>
        <div className="flex items-center gap-x-4">
          <Icon className="h-4 w-4" />
          {!collapsed && <span>{label}</span>}
        </div>
      </Link>
    </Button>
  );
};

export const NavItemSkeleton = () => {
  return (
    <li className="flex items-center gap-x-4 px-3 py-2">
      <Skeleton className="min-h-[32px] min-w-[32px] rounded-full" />
      <div className="flex-1">
        <Skeleton className="h-6" />
      </div>
    </li>
  );
};
