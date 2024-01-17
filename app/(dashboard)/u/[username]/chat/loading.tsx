import { Skeleton } from "@/components/ui/skeleton";
import { ToggleCardSkeleton } from "./_components/toggle-card";

const ChatLoading = () => {
  return (
    <div className="p-6 space-y-4 ">
      <Skeleton className="h-10 w-44" />
      <ToggleCardSkeleton />
      <ToggleCardSkeleton />
      <ToggleCardSkeleton />
    </div>
  );
};

export default ChatLoading;
