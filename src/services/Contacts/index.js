import { useQuery } from "@tanstack/react-query";
import Api from "./../index";
import { getDemoContacts } from "./demo";

export const isDemoMode = process.env.REACT_APP_DATA_SOURCE !== "api";

export const useCantacts = (query) => {
  const contacts = useQuery({
    queryKey: ["contacts-list", query],

    queryFn: async ({ signal }) => {
      if (isDemoMode) return getDemoContacts(query);
      const response = await Api.GET({ url: "passenger", query, signal });
      return response;
    },
    staleTime: 0,
  });

  return { contacts, count: contacts.data?.meta?.total ?? 0 };
};
