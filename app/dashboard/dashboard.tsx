
import { useQuery } from "@tanstack/react-query";

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

const UserItem = ({userData}: { userData: User }) => <li>{userData.username}</li>

const Dashboard = () => {
  const { data: users = [], isPending } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch('https://jsonplaceholder.typicode.com/users');
      return res.json();
    },
  });

  if (isPending) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <ul>
        {users.map((user) => (
          <UserItem key={user.id} userData={user} />
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
