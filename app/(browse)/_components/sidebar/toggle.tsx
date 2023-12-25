"use client";

import { useSidebar } from "@/store/use-sidebar";
import { Button } from "@/components/ui/button";
import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";

const Toggle = () => {
  const { collapsed, onExpand, onCollapse } = useSidebar((state) => state);

  const label = collapsed ? "Expand" : "Collapse";

  return (
    <>
      {collapsed && (
        <div className="hidden lg:flex w-full items-center justify-center pt-4 mb-4  ">
          <Button onClick={onExpand} className="h-auto p-2" variant="ghost">
            <ArrowRightFromLine className="h-4 w-4" />
          </Button>
        </div>
      )}
      {!collapsed && (
        <div className="p-3 mb-2 pl-6 flex items-center w-full">
          <p className="font-semibold text-primary">For you</p>
          <Button onClick={onCollapse} className="h-auto p-2 ml-auto" variant="ghost">
            <ArrowLeftFromLine className="h-4 w-4" />
          </Button>
        </div>
      )}
    </>
  );
};

export default Toggle;
