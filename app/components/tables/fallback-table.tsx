import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '../../components/ui/table';

const FallbackTable = () => {
  const columns = [
    { accessorKey: 'name', header: 'Name' },
    { accessorKey: 'username', header: 'Ussername' },
    { accessorKey: 'email', header: 'Email' },
    { accessorKey: 'actions', header: 'Actions' },
  ];

  return (
        <Table className='h-[50vh]'>
          <TableHeader>
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
  );
};

export default FallbackTable;
