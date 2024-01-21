const ProductsData = localStorage.getItem("products")
  ? JSON.parse(localStorage.getItem("products"))
    ? JSON.parse(localStorage.getItem("products"))
    : []
  : [];

export default ProductsData;
