import Wrapper from "./wrapper";
import { Following, FollowingSkeleton } from "./following";
import { Toggle, ToggleSkeleton } from "./toggle";
import { Recommanded, RecommandedSkeleton } from "./recommanded";
import { getRecommanded } from "@/lib/recommanded-service";
import { getFollowedUsers } from "@/lib/follow-service";

export const Sidebar = async () => {
  const following = await getFollowedUsers();
  const recommanded = await getRecommanded();
  return (
    <Wrapper>
      <Toggle />
      <div className="space-y-4 pt-4 lg:pt-0">
        <Following data={following} />
        <Recommanded data={recommanded} />
      </div>
    </Wrapper>
  );
};

export const SidebarSkeleton = () => {
  return (
    <aside className="fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-background border-r border-[#2D2E35] z-50">
      <ToggleSkeleton />
      <FollowingSkeleton />
      <RecommandedSkeleton />
    </aside>
  );
};
