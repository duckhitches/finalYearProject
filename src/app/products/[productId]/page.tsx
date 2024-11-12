// src/app/products/[productId]/page.tsx
'use client';

import * as React from "react";
import { useRouter } from "next/navigation";
import { QRCodeSVG } from "qrcode.react";
import { Button_v2 } from "@/components/button/page";

type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
};

export default function ProductDetails({ params }: { params: { productId: string } }) {
  const [product, setProduct] = React.useState<Product | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);
  const router = useRouter();

  // Fetch product data from API
  React.useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://dummyjson.com/products/${params.productId}`);
        if (!response.ok) throw new Error("Failed to fetch product data.");
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError("Failed to load product details.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.productId]);

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  // Product URL for QR code
  const productUrl = `http://localhost:3000/products/${params.productId}`;

  return (
    <div className="mx-auto max-w-screen-lg p-4 sm:p-8">
      {product && (
        <div className="bg-white shadow-lg rounded-lg p-6 sm:p-10">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            {/* Product Image */}
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full sm:w-1/2 lg:w-1/3 rounded-lg object-cover"
            />

            {/* Product Details */}
            <div className="w-full sm:w-1/2 lg:w-2/3 flex flex-col">
              <h1 className="text-2xl font-semibold mb-2 text-center sm:text-left">{product.title}</h1>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <p className="text-lg font-semibold text-green-500 mb-6">${product.price}</p>

              {/* QR Code Section */}
              <div className="mt-4 flex flex-col items-center sm:flex-row gap-4">
                <QRCodeSVG value={productUrl} size={120} />
                <p className="text-center sm:text-left">
                  Scan to view this product on another device or share with friends.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
            <Button_v2 className="w-full sm:w-auto bg-blue-500 text-white">Add to Cart</Button_v2>
            <Button_v2 className="w-full sm:w-auto bg-green-500 text-white" onClick={() => router.push('/')}>
              Back to Products
            </Button_v2>
          </div>
        </div>
      )}
    </div>
  );
}
