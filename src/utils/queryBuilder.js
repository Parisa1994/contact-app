import qs from "query-string";

export default function queryBuilder(param = {}) {
  if (typeof param !== "object") {
    param = qs.parse(param);
  }
  const { limit = undefined, sort = "", ...params } = param;
  delete params.count;
  let ordering = "";

  if (sort) {
    if (typeof sort === "object" && sort.order) {
      ordering = sort.order === "asc" ? sort.orderBy : "-" + sort.orderBy;
    } else if (typeof sort === "string") {
      ordering = sort;
    }
  }

  return `?${qs.stringify(
    { limit, ...(ordering !== "" && { ordering: ordering }), ...params },
    { arrayFormat: "comma" }
  )}`;
}
