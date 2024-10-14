import React from "react";
import { useLocation } from "react-router-dom";
import {
  Container,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
} from "@mui/material";

const ContactDetailsPage = () => {
  const location = useLocation();
  const { row } = location.state || {};

  if (!row) {
    return <Typography variant="h6">No contact details available</Typography>;
  }

  return (
    <Container sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Contact Details
      </Typography>
      <List>
        <ListItem>
          <ListItemAvatar>
            {row.avatar ? (
              <Avatar alt={`${row.first_name}'s avatar`} src={row.avatar} />
            ) : (
              <Avatar>{row.first_name[0] + row.last_name[0]}</Avatar>
            )}
          </ListItemAvatar>
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Name"
            secondary={
              row?.first_name || row?.last_name
                ? `${row?.first_name} ${row?.last_name}`
                : "no Name"
            }
          />
        </ListItem>
        <ListItem>
          <ListItemText primary="Gender" secondary={row?.gender} />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Email"
            secondary={row?.email ? row?.email : "no Email"}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Phone"
            secondary={row?.phone ? row?.phone : "no Phone"}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Telegram"
            secondary={row?.telegram ? row?.telegram : "no id Telegram"}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Company"
            secondary={row?.company ? row?.company : "no Comapany"}
          />
        </ListItem>
        company
        <ListItem>
          <ListItemText
            primary="Address"
            secondary={row?.address ? row?.address : "no address"}
          />
        </ListItem>
      </List>
    </Container>
  );
};

export default ContactDetailsPage;
