import React from 'react';
import { Avatar, Button, TableCell, TableRow } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const ContactsTableRow = ({ row }) => {
    const { id, first_name, last_name, phone, avatar, address } = row;
    const navigate = useNavigate();

    const handleDetailsClick = () => {

        navigate(`/contact-details/${id}`, { state: { row } });
    };

    return (
        <TableRow hover sx={{ '& td': { borderColor: '#edf1f6', py: 1.6 } }}>
            <TableCell>{id}</TableCell>
            <TableCell>
                <Avatar src={avatar || undefined} alt={`${first_name || ''} ${last_name || ''}`} sx={{ width: 40, height: 40, bgcolor: '#e2ebff', color: '#315ab4', fontSize: 14, fontWeight: 700 }}>{`${first_name?.[0] || ''}${last_name?.[0] || ''}`}</Avatar>
            </TableCell>
            <TableCell>{first_name}</TableCell>
            <TableCell>{last_name}</TableCell>
            <TableCell>{phone}</TableCell>
            <TableCell>{address}</TableCell>
            <TableCell><Button onClick={handleDetailsClick} aria-label={`View details for ${first_name || ''} ${last_name || ''}`} sx={{ textTransform: 'none', fontWeight: 600, whiteSpace: 'nowrap' }}>View details</Button></TableCell>
        </TableRow>
    );
};

export default ContactsTableRow;
