import qs from "query-string";

export default function queryBuilder(param: any = {}) {
  if (typeof param !== "object") {
    param = qs.parse(param);
  }
  const { limit = undefined, count = undefined, sort = "", ...params } = param;
  let ordering = "";

  if (sort.order) {
    if (typeof sort === "object") {
      ordering = sort.order === "asc" ? sort.orderBy : "-" + sort.orderBy;
    } else {
      ordering = sort;
    }
  }

  return `?${qs.stringify(
    { limit, ...(ordering != "" && { ordering: ordering }), ...params },
    { arrayFormat: "comma" }
  )}`;
}
