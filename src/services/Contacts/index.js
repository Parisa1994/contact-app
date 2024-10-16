import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Api from "./../index";

export const useCantacts = (query, id = null) => {
  const [count, setCount] = useState(10);
  const url = id ? `passenger/${id}` : "passenger";

  const contacts = useQuery({
    queryKey: ["contacts-list", query],

    queryFn: async ({ signal }) => {
      const response = await Api.GET({ url, query, signal });
      return response;
    },
    staleTime: 0,
  });

  useEffect(() => {
    if (contacts.data && !id) {
      setCount(contacts?.data?.meta?.total);
    }
  }, [contacts.data, id]);

  return { contacts, count };
};
