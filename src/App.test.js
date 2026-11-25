import { act, render, renderHook, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { ContactProvider } from "./context/ContactProvider";
import ContactDetailsPage from "./pages/ContactDetailsPage";
import useTable from "./components/Table/useTable";

beforeEach(() => localStorage.clear());

test("shows a useful fallback when a contact is opened without data", () => {
  render(<ContactProvider><MemoryRouter initialEntries={["/contact-details/12"]}><Routes><Route path="/contact-details/:id" element={<ContactDetailsPage />} /></Routes></MemoryRouter></ContactProvider>);
  expect(screen.getByText(/contact details are not available/i)).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /back to contacts/i })).toHaveAttribute("href", "/");
});

test("restores recently visited contact details after opening a direct link", async () => {
  localStorage.setItem("recentlyVisitedContacts", JSON.stringify([{ id: 12, first_name: "Alex", last_name: "Lee" }]));
  render(<ContactProvider><MemoryRouter initialEntries={["/contact-details/12"]}><Routes><Route path="/contact-details/:id" element={<ContactDetailsPage />} /></Routes></MemoryRouter></ContactProvider>);
  expect(await screen.findByText("Alex Lee")).toBeInTheDocument();
});

test("resets pagination and uses a valid default sort direction", () => {
  const { result } = renderHook(() => useTable({ defaultOrderBy: "id" }));
  expect(result.current.order).toBe("asc");
  act(() => result.current.onChangePage(null, 2));
  expect(result.current.page).toBe(2);
  act(() => result.current.onChangePage(null, 0));
  expect(result.current.page).toBe(0);
});
