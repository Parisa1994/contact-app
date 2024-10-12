'use client';

// @mui

import { Box, TablePagination } from '@mui/material';



export default function TablePaginationCustom({
  // dense,
  // onChangeDense,
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
        justifyContent: 'space-between',
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
        labelRowsPerPage='تعداد رکورد در هرصفحه:'
        getItemAriaLabel={(type) => `رفتن به صفحه ${type}`}
        labelDisplayedRows={({ from, to, count }) =>
          `${from}–${to} از ${count !== -1 ? count : `بیش از ${to}`} رکورد`
        }
        {...other}
      />
    </Box>
  );
}
