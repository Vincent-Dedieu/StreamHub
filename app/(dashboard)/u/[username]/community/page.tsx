import { getBlockedUsers } from "@/lib/block-service";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";
import { format } from "date-fns";

const CommunityPage = async () => {
  const blockedUsers = await getBlockedUsers();

  const formattedData = blockedUsers.map((user) => ({
    ...user,
    userId: user.blocked.id,
    imageUrl: user.blocked.imageUrl,
    username: user.blocked.username,
    createdAt: format(new Date(user.createdAt), "dd/MM/yyyy"),
  }));

  console.log({ formattedData });

  return (
    <div className="p-6">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Community Settings</h1>
      </div>
      <DataTable columns={columns} data={formattedData} />
    </div>
  );
};

export default CommunityPage;
