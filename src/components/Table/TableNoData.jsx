import React from "react";
// @mui
import { TableCell, TableRow, Typography } from '@mui/material';

export default function TableNoData({ isNotFound }) {
  return (
    <TableRow>
      {isNotFound ? (
        <TableCell colSpan={12}>
          <Typography
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
