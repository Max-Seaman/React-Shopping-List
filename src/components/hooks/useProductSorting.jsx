import { orderBy } from "lodash";

export function useProductSorting(list, sort) {
  switch (sort) {
    case "nameAsc":
      return orderBy(list, ["name"], ["asc"]);
    case "nameDesc":
      return orderBy(list, ["name"], ["desc"]);
    case "priceLow":
      return orderBy(list, ["price"], ["asc"]);
    case "priceHigh":
      return orderBy(list, ["price"], ["desc"]);
    case "ratingLow":
      return orderBy(list, ["rating"], ["asc"]);
    case "ratingHigh":
      return orderBy(list, ["rating"], ["desc"]);
    default:
      return list;
  }
}

export default useProductSorting;

