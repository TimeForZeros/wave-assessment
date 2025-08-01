import { Card, CardContent, CardHeader, CardDescription, CardTitle } from '../components/ui/card';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '../components/ui/table';
import { Loader2 } from 'lucide-react';

const FallbackTable = () => {
  // Define the same columns to maintain a consistent layout
  const columns = [
    { accessorKey: 'name', header: 'Name' },
    { accessorKey: 'username', header: 'Ussername' },
    { accessorKey: 'email', header: 'Email' },
    { accessorKey: 'actions', header: 'Actions' },
  ];

  return (
    // <Card className='w-full'>
    //   <CardHeader>
    //     <CardTitle>User Data</CardTitle>
    //     <CardDescription>Loading user data...</CardDescription>
    //   </CardHeader>
    //   <CardContent>
        <Table className='mt-4'>
          <TableHeader>
            {/* Render header with skeleton look */}
            <TableRow>
              {columns.map((column, index) => (
                <TableHead key={index}>
                  <div className='h-4 bg-gray-200 rounded animate-pulse'></div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* Render 5 skeleton rows */}
            {Array.from({ length: 10 }).map((_, rowIndex) => (
              <TableRow key={rowIndex}>
                {columns.map((column, colIndex) => (
                  <TableCell key={colIndex}>
                    <div className='h-4 bg-gray-200 rounded animate-pulse'></div>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
    //     <div className='flex items-center justify-center p-4'>
    //       <Loader2 className='h-6 w-6 animate-spin mr-2' />
    //       <span className='text-sm text-gray-500'>Loading...</span>
    //     </div>
    //   </CardContent>
    // </Card>
  );
};

export default FallbackTable;
