import React, { useCallback, useContext, useState, useEffect } from "react";
import {
  Container,
  Card,
  Table,
  TableBody,
  TableContainer,
  Typography,
  Button,
  Box,
  Chip,
} from "@mui/material";

// components
import {
  TableHeadCustom,
  TableNoData,
  TablePaginationCustom,
  TableSkeleton,
  useTable,
} from "../../components/Table";

import Search from "./components/Search";

import ContactsTableRow from "./components/ContactsTableRow";

//services
import { isDemoMode, useCantacts } from "./../../services/Contacts/index";

//context
import { ContactContext } from "./../../context/ContactProvider";

const ContactPage = () => {
  const { recentlyVisitedContacts } = useContext(ContactContext);

  const [filters, setFilters] = useState({ first_name: "", last_name: "" });

  const TABLE_HEAD = [
    { id: "id", label: "ID" },
    { id: "avatar", label: "Avatar" },
    { id: "first_name", label: "First name" },
    { id: "last_name", label: "Last name" },
    { id: "phone", label: "Phone" },
    { id: "address", label: "City" },
    { id: "details", label: "Details" },
  ];

  const {
    page,
    order,
    orderBy,
    rowsPerPage,
    onSort,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable({
    defaultRowsPerPage: 10,
    defaultCurrentPage: 0,
    defaultOrderBy: "id",
    defaultOrder: "asc",
  });

  const reducedFilters = {
    ...(filters.first_name && { first_name: { contains: filters.first_name } }),
    ...(filters.last_name && { last_name: { contains: filters.last_name } }),
  };

  useEffect(() => {
    onChangePage(null, 0);
  }, [onChangePage, filters]);

  const { contacts, count } = useCantacts({
    skip: page * rowsPerPage || 0,
    limit: rowsPerPage || 5,
    where: JSON.stringify(reducedFilters),
    sort: `${orderBy} ${order}`,
  });

  const onApplyFilters = useCallback((newFilters) => {
    setFilters(newFilters);
    onChangePage(null, 0);
  }, [onChangePage]);

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 3, md: 6 } }}>
      <Box sx={{ mb: 4 }}>
        <Typography sx={{ color: '#315ab4', fontSize: 13, letterSpacing: '.12em', fontWeight: 800, textTransform: 'uppercase', mb: 1 }}>Contacts workspace</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 1.5 }}>
          <Typography component="h1" variant="h4" sx={{ fontWeight: 750, letterSpacing: '-.035em' }}>Your contacts</Typography>
          {isDemoMode && <Chip label="Demo data" size="small" sx={{ bgcolor: '#e7efff', color: '#315ab4', fontWeight: 700 }} />}
        </Box>
        <Typography sx={{ mt: 1, color: '#66758a' }}>Find the people you need, all in one place.{isDemoMode && ' All contacts are fictional.'}</Typography>
      </Box>
      <Card elevation={0} sx={{ border: '1px solid #e8edf5', borderRadius: 3, boxShadow: '0 12px 35px rgba(36, 58, 95, .05)' }}><Search onApplyFilters={onApplyFilters} /></Card>
      {recentlyVisitedContacts.length > 0 && (
        <Card elevation={0} sx={{ mt: 3, p: { xs: 2, sm: 3 }, border: '1px solid #e8edf5', borderRadius: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, fontSize: 18 }}>Recently viewed</Typography>
          <Typography variant="body2" sx={{ color: '#66758a', mb: 1 }}>Pick up where you left off.</Typography>
          <TableContainer><Table sx={{ minWidth: 680 }}><TableBody>{recentlyVisitedContacts.map((contact) =>
            contact && contact.id ? (
              <ContactsTableRow key={contact.id} row={contact} />
            ) : null
          )}</TableBody></Table></TableContainer>
        </Card>
      )}
      <Card elevation={0} sx={{ mt: 3, border: '1px solid #e8edf5', borderRadius: 3, boxShadow: '0 12px 35px rgba(36, 58, 95, .05)' }}>
        <Box sx={{ px: 3, pt: 2.5, pb: 1 }}><Typography variant="h6" sx={{ fontSize: 18, fontWeight: 700 }}>Contact directory</Typography><Typography variant="body2" sx={{ color: '#66758a' }}>{count} {count === 1 ? 'contact' : 'contacts'} found</Typography></Box>
        <TableContainer sx={{ position: "relative" }}>
          <Table sx={{ minWidth: 800 }}>
            <TableHeadCustom sx={{ '& th': { backgroundColor: '#f8faff', color: '#64748b', fontWeight: 700, fontSize: 13, borderColor: '#edf1f6' } }}
              headLabel={TABLE_HEAD}
              onSort={onSort}
              order={order}
              orderBy={orderBy}
            />
            <TableBody>
              {contacts.isLoading ? (
                [...Array(rowsPerPage)].map((_, index) => (
                  <TableSkeleton key={index} />
                ))
              ) : contacts.isError ? (
                <tr><td colSpan={7}><Typography role="alert" sx={{ p: 2 }}>Could not load contacts. Check that the API is running. <Button onClick={() => contacts.refetch()}>Retry</Button></Typography></td></tr>
              ) : contacts?.data &&
                contacts?.data?.items &&
                contacts?.data?.items?.length > 0 ? (
                contacts?.data?.items?.map((row) => (
                  <ContactsTableRow key={row.id} row={row} />
                ))
              ) : (
                <TableNoData
                  isNotFound={
                    !contacts?.isLoading && contacts?.data?.items?.length === 0
                  }
                />
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePaginationCustom
          count={count}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={onChangePage}
          onRowsPerPageChange={onChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
};

export default ContactPage;
