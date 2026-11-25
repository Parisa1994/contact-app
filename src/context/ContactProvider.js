import React, { createContext, useState, useEffect, useCallback } from "react";

export const ContactContext = createContext();
const storageKey = process.env.REACT_APP_DATA_SOURCE === "api" ? "recentlyVisitedContacts" : "recentlyVisitedDemoContacts";

export const ContactProvider = ({ children }) => {
  const [recentlyVisitedContacts, setRecentlyVisitedContacts] = useState([]);

  useEffect(() => {
    const storedContacts = localStorage.getItem(storageKey);
    if (storedContacts) {
      try {
        const parsedContacts = JSON.parse(storedContacts);
        if (Array.isArray(parsedContacts)) setRecentlyVisitedContacts(parsedContacts.filter(Boolean));
      } catch (error) {
        console.warn("Could not restore recently visited contacts", error);
      }
    }
  }, []);

  useEffect(() => {
    if (recentlyVisitedContacts.length > 0) {
      localStorage.setItem(
        storageKey,
        JSON.stringify(recentlyVisitedContacts)
      );
    }
  }, [recentlyVisitedContacts]);

  const addVisitedContact = useCallback((contact) => {
    if (!contact || !contact.id) return;
    setRecentlyVisitedContacts((prevContacts) => {
      const updatedContacts = prevContacts.filter((c) => c.id !== contact.id);
      updatedContacts.unshift(contact);
      return updatedContacts.slice(0, 4);
    });
  }, []);

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
