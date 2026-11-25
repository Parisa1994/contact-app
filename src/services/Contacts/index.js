import { useQuery } from "@tanstack/react-query";
import Api from "./../index";

export const useCantacts = (query) => {
  const contacts = useQuery({
    queryKey: ["contacts-list", query],

    queryFn: async ({ signal }) => {
      const response = await Api.GET({ url: "passenger", query, signal });
      return response;
    },
    staleTime: 0,
  });

  return { contacts, count: contacts.data?.meta?.total ?? 0 };
};
