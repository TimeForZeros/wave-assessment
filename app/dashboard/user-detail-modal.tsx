import {
  Card,
  CardContent,
  CardFooter,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../components/ui/dialog';
import { Button } from '../components/ui/button';
import type { User } from '../store';

const UserDetailModal = ({ user }: { user: User }) => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Details</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>User Details</DialogTitle>
        </DialogHeader>
        <Card className='w-[90%] max-w-lg shadow-lg'>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 p-6'>
            <div className='flex items-center space-x-4'>
              <div>
                <CardTitle className='text-2xl font-bold'>{user.name}</CardTitle>
                <CardDescription className='text-sm font-medium text-gray-500'>
                  @{user.username}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className='space-y-6 p-6 pt-0'>
            {user.company && (
              <div className='space-y-4'>
                <CardTitle className='text-lg font-semibold text-gray-700'>
                  Company Details
                </CardTitle>
                <CardDescription className='text-gray-600'>
                  <div className='space-y-1'>
                    <p className='text-sm font-medium'>{user.company?.name}</p>
                    <p className='text-sm font-medium'>"{user.company?.catchPhrase}"</p>
                    <p className='text-sm font-medium'>{user.company?.bs}</p>
                  </div>
                </CardDescription>
              </div>
            )}

            <div className='space-y-4'>
              <CardTitle className='text-lg font-semibold text-gray-700'>
                Contact & Address
              </CardTitle>
              <CardDescription className='text-gray-600'>
                <div className='space-y-1'>
                  <p className='text-sm font-medium'>{user.email}</p>
                  <p className='text-sm font-medium'>{user.phone}</p>
                  <a
                    href={`http://${user.website}`}
                    className='text-sm font-medium hover:underline text-blue-600'
                  >
                    {user.website}
                  </a>
                  {user.address && (
                    <address className='text-sm font-medium not-italic mt-1'>
                      {user.address?.street}, {user.address?.suite}
                      <br />
                      {user.address?.city}, {user.address?.zipcode}
                    </address>
                  )}
                </div>
              </CardDescription>
            </div>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default UserDetailModal;
