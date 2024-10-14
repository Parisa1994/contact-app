import React, { useState, useEffect } from "react";
import {
  Container,
  Card,
  CardHeader,
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

import ContactsTableRow from "./components/ContactsTableRow";
import { useCantacts } from "./../../services/Contacts/index";

const ContactPage = () => {
  //const [filters, setFilters] = useState({ is_active: "all" });

  const TABLE_HEAD = [
    { id: "id", label: "id" },
    { id: "avatar", label: "آواتار" },
    { id: "first_name", label: "نام" },
    { id: "last_name", label: "نام خانوادگی" },
    { id: "phone", label: "تلفن" },
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
    defaultOrder: "desc",
  });

  // const reducedFilters = {
  //   ...(filters.search != "" && { search: filters.search }),
  //   ...(filters.is_active !== "all" && {
  //     is_active: filters.is_active === "not_active" ? false : true,
  //   }),
  //   ...(filters.dateFrom && { insert_date_after: filters.dateFrom }),
  //   ...(filters.dateTo && { insert_date_before: filters.dateTo }),
  // };

  // const { contacts, count } = useCantacts({
  //   offset: page * rowsPerPage,
  //   ...reducedFilters,
  //   limit: rowsPerPage,
  //   sort: { order, orderBy },
  // });

  // useEffect(() => {
  //   onChangePage(0);
  // }, [onChangePage, filters.search]);

  const { contacts, count, isLoading } = useCantacts({
    skip: page * rowsPerPage || 0,
    limit: rowsPerPage || 5,
    //sort: { order: "ccreatedAt DESC" },
  });

  console.log(contacts?.data?.items);

  return (
    <Container>
      <Card>
        <CardHeader>
          <Typography>مشاهده فهرست کاربران</Typography>
        </CardHeader>
        <TableContainer sx={{ position: "relative", direction: "rtl" }}>
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
