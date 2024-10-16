import React, { createContext, useState, useEffect } from "react";

export const ContactContext = createContext();

export const ContactProvider = ({ children }) => {
  const [recentlyVisitedContacts, setRecentlyVisitedContacts] = useState([]);

  useEffect(() => {
    const storedContacts = localStorage.getItem("recentlyVisitedContacts");
    if (storedContacts) {
      const parsedContacts = JSON.parse(storedContacts);
      setRecentlyVisitedContacts(
        parsedContacts.filter((contact) => contact !== null)
      );
    }
  }, []);

  useEffect(() => {
    if (recentlyVisitedContacts.length > 0) {
      localStorage.setItem(
        "recentlyVisitedContacts",
        JSON.stringify(recentlyVisitedContacts)
      );
    }
  }, [recentlyVisitedContacts]);

  const addVisitedContact = (contact) => {
    if (!contact || !contact.id) return;
    setRecentlyVisitedContacts((prevContacts) => {
      const updatedContacts = prevContacts.filter((c) => c.id !== contact.id);
      updatedContacts.unshift(contact);
      return updatedContacts.slice(0, 4);
    });
  };

  // const addVisitedContact = (contact) => {
  //   setRecentlyVisitedContacts((prevContacts) => {
  //     const updatedContacts = [contact, ...prevContacts];
  //     const uniqueContacts = updatedContacts.filter(
  //       (v, i, a) => a.findIndex((t) => t.id === v.id) === i
  //     );
  //     return uniqueContacts.slice(0, 4);
  //   });
  // };

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
