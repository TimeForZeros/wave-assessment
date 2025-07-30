import { useEffect, useState } from "react";

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

const UserItem = ({userData}: { userData: User }) => <li>{userData.username}</li>

const Dashboard = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => res.json())
      .then(setUsers);
  }, []);


  return (<div>
    <h1>Dashboard</h1>
    <ul>
      {users.length > 0 && users.map((user) => <UserItem userData={user} />)}
    </ul>
  </div>)
};

export default Dashboard;
