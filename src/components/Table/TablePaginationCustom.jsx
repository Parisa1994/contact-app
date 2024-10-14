import React from "react";

import { Box, TablePagination } from '@mui/material';

export default function TablePaginationCustom({
  rowsPerPageOptions = [5, 10, 25],
  buttons,
  sx,
  ...other
}) {
  return (
    <Box
      sx={{

        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderTop: '1px solid',
        borderColor: (theme) => (theme.palette.mode === 'light' ? 'grey.300' : 'grey.700'),
        gap: 1,
        ...sx
      }}
    >
      <Box sx={{ ml: 2 }}>{buttons}</Box>
      <TablePagination
        sx={{ borderTop: 'none' }}
        rowsPerPageOptions={rowsPerPageOptions}
        component='div'
        labelRowsPerPage='The number of records per page:'
        getItemAriaLabel={(type) => `go to page ${type}`}
        labelDisplayedRows={({ from, to, count }) =>
          `${from}–${to} of ${count !== -1 ? count : ` ${to}`} records`
        }
        {...other}
      />
    </Box>
  );
}
