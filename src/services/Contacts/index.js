import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Api from "./../index";

export const useCantacts = (query) => {
  const [count, setCount] = useState(10);
  const contacts = useQuery({
    queryKey: ["contacts-list", query],

    queryFn: async ({ signal }) => {
      const response = await Api.GET({ url: "passenger", query, signal });
      return response;
    },
    staleTime: 0,
  });

  useEffect(() => {
    if (contacts.data) {
      setCount(contacts?.data?.meta?.total);
    }
  }, [contacts.data]);

  return { contacts, count };
};
