import React, { createContext, useState } from "react";

export const ContactContext = createContext();

export const ContactProvider = ({ children }) => {
  const [recentlyVisitedContacts, setRecentlyVisitedContacts] = useState([]);

  const addVisitedContact = (contact) => {
    setRecentlyVisitedContacts((prevContacts) => {
      const updatedContacts = [contact, ...prevContacts];
      const uniqueContacts = updatedContacts.filter(
        (v, i, a) => a.findIndex((t) => t.id === v.id) === i
      );
      return uniqueContacts.slice(0, 4);
    });
  };

  return (
    <ContactContext.Provider
      value={{
        recentlyVisitedContacts,
        addVisitedContact,
      }}
    >
      {children}
    </ContactContext.Provider>
  );
};
