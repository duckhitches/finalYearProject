'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

const FilteredProductList = () => {
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const searchParams = useSearchParams();
  const query = searchParams.get('query');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products');
        const data = await response.json();
        const matches = data.products.filter((product: any) =>
          product.title.toLowerCase().includes(query?.toLowerCase() || '')
        );
        setFilteredProducts(matches);
      } catch (error) {
        console.error('Failed to fetch filtered products:', error);
      }
    };

    fetchProducts();
  }, [query]);

  return (
    <div>
      <h1 className="text-center text-2xl font-bold my-4">Search Results for "{query}"</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredProducts.map((product) => (
          <div key={product.id} className="border p-4 rounded shadow">
            <h2 className="text-lg font-bold">{product.title}</h2>
            <p>{product.description}</p>
            <p className="text-blue-500">${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilteredProductList;
