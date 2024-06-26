import { Thumbnail } from "@/components/thumbnail";
import { VerifiedMark } from "@/components/verified-mark";
import Link from "next/link";

interface ResultCardProps {
  data: {
    thumbnailUrl: string | null;
    isLive: boolean;
    name: string;
    user: {
      imageUrl: string;
      username: string;
    };
  };
}

export const ResultCard = ({ data }: ResultCardProps) => {
  return (
    <Link href={`/${data.user.username}`}>
      <div className="w-full flex gap-x-4">
        <div className="relative h-[9rem] w-[16rem]">
          <Thumbnail
            src={data.thumbnailUrl}
            fallback={data.user.imageUrl}
            isLive={data.isLive}
            username={data.user.username}
          />
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-x-2">
            <p className="font-bold text-lg cursor-pointer hover:text-blue-500">{data.user.username} </p>
            <VerifiedMark />
          </div>
          <p className="text-sm text-muted-foreground">{data.name} </p>
        </div>
      </div>
    </Link>
  );
};
