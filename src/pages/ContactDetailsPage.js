import React, { useContext, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import {
  Container,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
} from "@mui/material";
import { ContactContext } from "./../context/ContactProvider";
import { isDemoMode } from "../services/Contacts";
import { getDemoContact } from "../services/Contacts/demo";

const ContactDetailsPage = () => {
  const location = useLocation();
  const { id } = useParams();
  const { addVisitedContact, recentlyVisitedContacts } = useContext(ContactContext);
  const row = location.state?.row || (isDemoMode ? getDemoContact(id) : undefined) || recentlyVisitedContacts.find((contact) => String(contact.id) === id);

  useEffect(() => {
    if (row) {
      addVisitedContact(row);
    }
  }, [row, addVisitedContact]);

  if (!row) {
    return <Container sx={{ p: 4 }}><Typography variant="h6">Contact details are not available. Open this contact from the list.</Typography><Link to="/">Back to contacts</Link></Container>;
  }

  return (
    <Container sx={{ p: 4 }}>
      <Link to="/">Back to contacts</Link>
      <Typography variant="h4" gutterBottom>
        Contact Details
      </Typography>
      <List>
        <ListItem>
          <ListItemAvatar>
            {row.avatar ? (
              <Avatar alt={`${row.first_name}'s avatar`} src={row.avatar} />
            ) : (
              <Avatar>{(row.first_name?.[0] || "") + (row.last_name?.[0] || "")}</Avatar>
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
