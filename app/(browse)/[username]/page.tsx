interface UserPageProps {
  params: {
    username: string;
  };
}

const UserPage = ({ params }: UserPageProps) => {
  return <div> user : {params.username}</div>;
};

export default UserPage;
