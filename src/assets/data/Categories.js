export const Categories = localStorage.getItem("categories")
  ? JSON.parse(localStorage.getItem("categories"))
    ? JSON.parse(localStorage.getItem("categories"))
    : []
  : [];

