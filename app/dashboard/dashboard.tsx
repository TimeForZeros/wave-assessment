import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  flexRender,
  createColumnHelper,
} from '@tanstack/react-table';
import { useState, useMemo } from 'react';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '../components/ui/table';
import type { SortingState } from '@tanstack/react-table';
import { ChevronUp, ChevronDown } from 'lucide-react';

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

const Dashboard = () => {
  const { data: users = [], isPending } = useSuspenseQuery<User[]>({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await fetch('https://jsonplaceholder.typicode.com/users');
      return res.json();
    },
  });

  const columnHelper = createColumnHelper<User>();
  const columns = [
    columnHelper.accessor('id', {
      header: 'ID',
      cell: (info) => info.getValue(),
    }),
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
  ];

  if (isPending) {
    return <div>Loading...</div>;
  }

  const [globalFilter, setGlobalFilter] = useState('');

  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data: users,
    columns,
    state: {
      globalFilter,
      sorting,
    },
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    globalFilterFn: (row, columnId, filterValue) => {
      return String(row.getValue(columnId)).toLowerCase().includes(filterValue.toLowerCase());
    },
  });

  return (
    <div>
      <input
        value={globalFilter}
        onChange={(e) => setGlobalFilter(e.target.value)}
        placeholder='Search users...'
        className='mb-4 p-2 border rounded'
        aria-label='Search users'
      />
      <Table aria-label='User data table'>
        <TableHeader>
          <TableRow>
            {table.getHeaderGroups()[0].headers.map((header) => (
              <TableHead
                key={header.id}
                onClick={
                  header.column.getCanSort() ? () => header.column.toggleSorting() : undefined
                }
                className={header.column.getCanSort() ? 'cursor-pointer select-none' : ''}
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
                <TableCell key={cell.id} role='cell'>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Dashboard;
