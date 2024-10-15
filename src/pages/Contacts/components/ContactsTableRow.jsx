import React from 'react';
import { TableCell, TableRow } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const ContactsTableRow = ({ row }) => {
    const { id, first_name, last_name, phone, avatar, address } = row;
    const navigate = useNavigate();

    const handleDetailsClick = () => {

        navigate(`/contact-details/${id}`, { state: { row } });
    };

    return (
        <TableRow>
            <TableCell>{id}</TableCell>
            <TableCell>
                {avatar ? <img src={avatar} alt={`${first_name}'s avatar`} width={50} height={50} /> : 'No avatar'}
            </TableCell>
            <TableCell>{first_name}</TableCell>
            <TableCell>{last_name}</TableCell>
            <TableCell>{phone}</TableCell>
            <TableCell>{address}</TableCell>
            <TableCell onClick={handleDetailsClick}>
                DetailsContact </TableCell>
        </TableRow>
    );
};

export default ContactsTableRow;