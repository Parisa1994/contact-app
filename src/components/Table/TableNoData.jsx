import React from "react";
// @mui
import { TableCell, TableRow, Typography } from '@mui/material';

export default function TableNoData({ isNotFound }) {
  return (
    <TableRow>
      {isNotFound ? (
        <TableCell colSpan={12}>
          <Typography sx={{ py: 3 }}>No contacts found.</Typography>
        </TableCell>
      ) : (
        <TableCell colSpan={12} sx={{ p: 0 }} />
      )}
    </TableRow>
  );
}
