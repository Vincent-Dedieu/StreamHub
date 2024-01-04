import { notFound } from "next/navigation";
import { Actions } from "./_components/actions";
import { getUserByUsername } from "@/lib/user-service";
import { isFollowingUser } from "@/lib/follow-service";
import { isBlockedByUser } from "@/lib/block-service";

interface UserPageProps {
  params: {
    username: string;
  };
}

const UserPage = async ({ params }: UserPageProps) => {
  const user = await getUserByUsername(params.username);

  if (!user) {
    notFound();
  }

  const isFollowing = await isFollowingUser(user.id);
  const isBlocked = await isBlockedByUser(user.id);

  return (
    <div className="flex flex-col">
      <p>username : {user.username}</p>
      <p>userId : {user.id}</p>
      <p>isFollowing : {`${isFollowing}`}</p>
      <p>
        is blocked by {user.username} : {`${isBlocked}`}
      </p>
      <Actions userId={user.id} isFollowing={isFollowing} />
    </div>
  );
};

export default UserPage;
