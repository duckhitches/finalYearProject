"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button_v2 } from "../button/page";

export const SearchBar = ({ products }: { products: any[] }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [isDropdownVisible, setDropdownVisible] = useState(false); // Manage dropdown visibility
  const router = useRouter();
  const searchBarRef = useRef<HTMLDivElement>(null); // To detect clicks outside

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    if (term.trim() === "") {
      setSuggestions([]);
      return;
    }
    const matches = products.filter((product) =>
      product.title.toLowerCase().includes(term.toLowerCase())
    );
    setSuggestions(matches);
    setDropdownVisible(true); // Show dropdown
  };

  const handleSuggestionClick = (productId: number) => {
    router.push(`/products/${productId}`);
    setSearchTerm(""); // Reset search bar
    setSuggestions([]); // Clear suggestions
    setDropdownVisible(false); // Close dropdown
  };

  const handleOutsideClick = (event: MouseEvent) => {
    if (searchBarRef.current && !searchBarRef.current.contains(event.target as Node)) {
      setDropdownVisible(false); // Close dropdown when clicking outside
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className="relative w-full max-w-md mx-auto" ref={searchBarRef}>
      <div className="flex flex-col">
        <input
          type="text"
          className="w-full p-3 border border-gray-300 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => setDropdownVisible(true)} // Show dropdown on focus
        />
        <Button_v2
          className="absolute right-3 top-1 bg-blue-500 text-white p-2 rounded-lg shadow-xl"
          onClick={() => router.push(`/product-list/filtered?query=${searchTerm}`)}
        >
          Search
        </Button_v2>
      </div>
      {isDropdownVisible && suggestions.length > 0 && (
        <ul className="absolute bg-white border dark:text-black border-gray-200 rounded-lg mt-1 max-h-60 w-full overflow-auto z-50 shadow-lg">
          {suggestions.map((product) => (
            <li
              key={product.id}
              className="p-3 hover:bg-blue-100 cursor-pointer"
              onClick={() => handleSuggestionClick(product.id)}
            >
              {product.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
