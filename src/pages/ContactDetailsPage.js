import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  Container,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
  Button,
} from "@mui/material";
import { ContactContext } from "./../context/ContactProvider";
import { useCantacts } from "../services/Contacts/index";

const ContactDetailsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { addVisitedContact } = useContext(ContactContext);

  const [row, setRow] = useState(null);

  useEffect(() => {
    if (location.state?.row) {
      setRow(location.state.row);
      addVisitedContact(location.state.row);
    }
  }, [location.state, addVisitedContact]);

  const {
    contacts: { data, isLoading, error },
  } = useCantacts({}, id);

  useEffect(() => {
    if (!row && data?.data) {
      setRow(data?.data);
      addVisitedContact(data?.data);
    }
  }, [data, row, addVisitedContact]);

  if (isLoading) {
    return <Typography variant="h6">Loading...</Typography>;
  }

  if (error) {
    return <Typography variant="h6">Error fetching contact details</Typography>;
  }

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
          <ListItemText
            primary="Gender"
            secondary={row?.gender || "No Gender"}
          />
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
            secondary={row?.company ? row?.company : "no Company"}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Address"
            secondary={row?.address ? row?.address : "no address"}
          />
        </ListItem>
      </List>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate(-1)}
        sx={{ mt: 2 }}
      >
        Back
      </Button>
    </Container>
  );
};

export default ContactDetailsPage;
