import React, { useState, useEffect } from "react";
import {
  Container,
  Card,
  Table,
  TableBody,
  TableContainer,
  Typography,
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
import { useCantacts } from "./../../services/Contacts/index";

const ContactPage = () => {
  const [filters, setFilters] = useState({ first_name: "", last_name: "" });

  const TABLE_HEAD = [
    { id: "id", label: "id" },
    { id: "avatar", label: "Avatar" },
    { id: "first_name", label: "FirstName" },
    { id: "last_name", label: "LastName" },
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
    defaultRowsPerPage: 5,
    defaultCurrentPage: 0,
    defaultOrderBy: "createdAt",
  });

  const reducedFilters = {
    ...(filters.first_name && { first_name: { contains: filters.first_name } }),
    ...(filters.last_name && { last_name: { contains: filters.last_name } }),
  };

  useEffect(() => {
    onChangePage(0);
  }, [onChangePage, filters]);

  const { contacts, count, isLoading } = useCantacts({
    skip: page * rowsPerPage || 0,
    limit: rowsPerPage || 5,
    where: JSON.stringify(reducedFilters),
    sort: `${orderBy} ${order}`,
  });

  const onApplyFilters = (newFilters) => {
    setFilters(newFilters);
    onChangePage(0);
  };

  console.log(contacts?.data?.items);

  return (
    <Container sx={{ mt: 2 }}>
      <Typography> List Contacts </Typography>
      <Search onApplyFilters={onApplyFilters} />
      <Card sx={{ mt: 10 }}>
        <TableContainer sx={{ position: "relative" }}>
          <Table sx={{ minWidth: 800 }}>
            <TableHeadCustom
              headLabel={TABLE_HEAD}
              onSort={onSort}
              order={order}
              orderBy={orderBy}
            />
            <TableBody>
              {isLoading ? (
                [...Array(rowsPerPage)].map((_, index) => (
                  <TableSkeleton key={index} />
                ))
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
