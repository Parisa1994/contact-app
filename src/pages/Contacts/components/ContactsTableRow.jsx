import React from 'react';
import { TableCell, TableRow } from '@mui/material';

const ContactsTableRow = ({ row }) => {
    console.log(row)
    const { id, first_name, last_name, phone, avatar } = row;
    return (
        <>
            <TableRow>
                <TableCell>{id}</TableCell>
                <TableCell>
                    {avatar ? <img src={avatar} alt={`${first_name}'s avatar`} width={50} height={50} /> : 'No avatar'}
                </TableCell>
                <TableCell>{first_name}</TableCell>
                <TableCell>{last_name}</TableCell>
                <TableCell>{phone}</TableCell>

            </TableRow>

        </>
    );
};

export default ContactsTableRow;