import { Suspense, lazy } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '../components/ui/card';
import AddUserModal from './add-user-modal';
import FallbackTable from '../components/tables/fallback-table';

const UserTable = lazy(() => import('../components/tables/user-table'));

const Dashboard = () => {
  return (
    <div className='w-screen h-[100vh - 3rem] flex'>
      <Card className='min-w-[450px] w-[90vw] max-w-[70rem] mx-auto mt-6'>
        <CardHeader className='text-4xl font-bold justify-around'>Users Table</CardHeader>
        <CardContent>
          <Suspense fallback={<FallbackTable />}>
            <UserTable />
          </Suspense>
        </CardContent>
        <CardFooter>
          <AddUserModal />
        </CardFooter>
      </Card>
    </div>
  );
};

export default Dashboard;
