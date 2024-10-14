import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Api from "./../index";

export const useCantacts = (query) => {
  const [count, setCount] = useState(10);
  const contacts = useQuery({
    queryKey: ["contacts-list", query],
    queryFn: async ({ signal }) => {
      console.log("Query Params: ", query);
      const response = await Api.GET({ url: "passenger", query, signal });
      console.log("API Response: ", response.items);
      return response;
    },
    staleTime: 0,
  });

  console.log(contacts?.data?.meta?.total);

  useEffect(() => {
    if (contacts.data) {
      setCount(contacts?.data?.meta?.total);
    }
  }, [contacts.data]);

  return { contacts, count };
};
