// @mui
import { TableCell, TableRow } from '@mui/material';

//
import { EmptyContent } from '../EmptyContent';

// ----------------------------------------------------------------------


export default function TableNoData({ isNotFound }) {
  return (
    <TableRow>
      {isNotFound ? (
        <TableCell colSpan={12}>
          <EmptyContent
            title='هیچ داده ای یافت نشد.'
            sx={{
              '& span.MuiBox-root': { height: 160 }
            }}
          />
        </TableCell>
      ) : (
        <TableCell colSpan={12} sx={{ p: 0 }} />
      )}
    </TableRow>
  );
}
