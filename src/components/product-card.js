'use client';

export default function ProductCard({ product }) {
  return (
    <div className="p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-200">
      <img
        src={product.image}
        alt={product.name}
        className="h-48 w-full object-cover rounded-t-lg"
      />
      <h2 className="mt-2 text-lg font-semibold">{product.name}</h2>
    </div>
  );
}
