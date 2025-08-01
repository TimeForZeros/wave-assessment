import { useSuspenseQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import clsx from 'clsx';
import { Card, CardContent, CardFooter, CardHeader } from '../components/ui/card';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  flexRender,
  createColumnHelper,
} from '@tanstack/react-table';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '../components/ui/table';
import { ChevronUp, ChevronDown } from 'lucide-react';
import AddUserModal from './add-user-modal';
import useStore, { type User } from '../store';
import { ScrollArea, ScrollBar } from '../components/ui/scroll-area';
import UserDetailModal from './user-detail-modal';

const UserTable = () => {
  // might look like overkill to use tanstack query and zustand for this, but assuming a real scenario for fetching, this is how I'd do it.
  useSuspenseQuery<User[]>({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await fetch('https://jsonplaceholder.typicode.com/users');
      const userData = await res.json();
      console.log(userData);
      // wouldn't normally do this, but since adding users is local, this is a workaround to not invalidate to refetch
      useStore.getState().setUsers(userData);
      return userData;
    },
    staleTime: Infinity,
  });

  const globalFilter = useStore((state) => state.globalFilter);
  const setGlobalFilter = useStore((state) => state.setGlobalFilter);
  const sorting = useStore((state) => state.sorting);
  const setSorting = useStore((state) => state.setSorting);

  const columnHelper = createColumnHelper<User>();
  const columns = useMemo(
    () => [
      columnHelper.accessor('name', {
        header: 'Name',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('username', {
        header: 'Username',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('email', {
        header: 'Email',
        cell: (info) => info.getValue(),
      }),
      columnHelper.display({
        id: 'actions', // A unique ID is required for a display column
        header: 'Actions',
        cell: (props) => <UserDetailModal user={props.row.original} />,
      }),
    ],
    [],
  );

  const table = useReactTable({
    data: useStore((state) => state.users),
    columns,
    state: {
      globalFilter,
      sorting,
    },
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: (updaterOrValue) =>
      typeof updaterOrValue === 'function'
        ? setSorting(updaterOrValue(sorting))
        : setSorting(updaterOrValue),
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    globalFilterFn: (row, columnId, filterValue) => {
      return String(row.getValue(columnId)).toLowerCase().includes(filterValue.toLowerCase());
    },
  });
  return (
    <>
      <input
        value={globalFilter}
        onChange={(e) => setGlobalFilter(e.target.value)}
        placeholder='Search users...'
        className='mb-4 p-2 border rounded'
        aria-label='Search users'
      />
      <ScrollArea className='h-[50vh] min-w-[400px] max-w-screen whitespace-nowrap rounded-md border'>
        <Table aria-label='User data table'>
          <TableHeader>
            <TableRow>
              {table.getHeaderGroups()[0].headers.map((header) => (
                <TableHead
                  key={header.id}
                  onClick={
                    header.column.getCanSort() ? () => header.column.toggleSorting() : undefined
                  }
                  className={clsx(
                    'min-w-[4rem]',
                    header.column.getCanSort() ? 'cursor-pointer select-none' : '',
                  )}
                  aria-sort={
                    header.column.getIsSorted() === 'asc'
                      ? 'ascending'
                      : header.column.getIsSorted() === 'desc'
                      ? 'descending'
                      : 'none'
                  }
                  tabIndex={header.column.getCanSort() ? 0 : undefined}
                  role='columnheader'
                >
                  <div className='flex px-1 align-bottom'>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    {header.column.getIsSorted() === 'asc' && (
                      <ChevronUp size={20} aria-hidden='true' />
                    )}
                    {header.column.getIsSorted() === 'desc' && (
                      <ChevronDown size={20} aria-hidden='true' />
                    )}
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} role='row'>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} role='cell' className='min-w-[4rem]'>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <ScrollBar orientation='horizontal' />
      </ScrollArea>
    </>
  );
};

const Dashboard = () => {
  return (
    <div className='w-screen h-[100vh - 3rem] flex'>
      <Card className='min-w-[450px] w-[90vw] max-w-[70rem] mx-auto mt-6'>
        <CardHeader className='text-4xl font-bold justify-around'>Users Table</CardHeader>
        <CardContent>
          <UserTable />
        </CardContent>
        <CardFooter>
          <AddUserModal />
        </CardFooter>
      </Card>
    </div>
  );
};

export default Dashboard;
