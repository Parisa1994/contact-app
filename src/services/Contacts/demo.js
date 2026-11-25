// Fictional contacts for the self-contained demo. No requests leave the browser.
const names = [
  ["Ava", "Bennett"], ["Noah", "Carter"], ["Mia", "Davis"],
  ["Leo", "Evans"], ["Nora", "Foster"], ["Owen", "Garcia"],
  ["Luna", "Hayes"], ["Ethan", "Irwin"], ["Sofia", "Jones"],
  ["Aria", "Kim"], ["Milo", "Lewis"], ["Zoe", "Martin"],
  ["Iris", "Nelson"], ["Finn", "Parker"],
];

export const demoContacts = names.map(([first_name, last_name], index) => ({
  id: index + 101,
  first_name,
  last_name,
  email: `${first_name.toLowerCase()}.${last_name.toLowerCase()}@example.com`,
  phone: `555-010${String(index).padStart(2, "0")}`,
  address: ["London", "Berlin", "Toronto", "Paris"][index % 4],
  company: "Example Company",
}));

export function getDemoContact(id) {
  return demoContacts.find((contact) => String(contact.id) === String(id));
}

export function getDemoContacts({ skip = 0, limit = 10, where = "{}", sort = "id asc" } = {}) {
  const filters = JSON.parse(where);
  const [field, direction] = sort.split(" ");
  const allowedFields = ["id", "first_name", "last_name", "phone", "address"];
  const sortField = allowedFields.includes(field) ? field : "id";
  const matches = demoContacts.filter((contact) =>
    ["first_name", "last_name"].every((key) =>
      String(contact[key]).toLowerCase().includes(String(filters[key]?.contains || "").toLowerCase())
    )
  );
  const sorted = [...matches].sort((a, b) => {
    const comparison = typeof a[sortField] === "number"
      ? a[sortField] - b[sortField]
      : String(a[sortField]).localeCompare(String(b[sortField]));
    return direction === "desc" ? -comparison : comparison;
  });
  return { items: sorted.slice(skip, skip + limit), meta: { total: sorted.length } };
}
