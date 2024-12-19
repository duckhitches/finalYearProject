'use server';

import ProductList from "@/components/product-list";

async function fetchListOfProducts() {
  try {
    const apiResponse = await fetch("https://dummyjson.com/products");
    const data = await apiResponse.json();
    return data?.products;
  } catch (e) {
    console.error("Failed to fetch data:", e);
  }
}

export default async function Products() {
  const productList = await fetchListOfProducts();
  return <ProductList productList={productList} />;
}
