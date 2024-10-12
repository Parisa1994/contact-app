// @mui

import { Skeleton, TableCell, TableRow } from '@mui/material';

// ----------------------------------------------------------------------

export default function TableSkeleton({ ...other }) {
  return (
    <TableRow {...other}>
      <TableCell colSpan={12} sx={{ paddingBlock: 0 }}>
        <Skeleton variant='text' width='100%' height={72} />
      </TableCell>
    </TableRow>
  );
}
