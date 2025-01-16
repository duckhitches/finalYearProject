"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { QRCodeSVG } from "qrcode.react";
import { Button_v2 } from "@/components/button/page";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { SkeletonCard } from "@/components/skeletons/page";

// Firebase imports
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db, auth } from "@/lib/firebaseConfig";
import { useState, useEffect } from "react";

// Product Type
type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  shippingInformation: string;
};

// WishlistButton Component
const WishlistButton = ({ product }: { product: Product }) => {
  const [added, setAdded] = useState(false);
  const user = auth.currentUser;

  const addToWishlist = async () => {
    if (!user) {
      alert("Please log in to add to wishlist.");
      return;
    }
  
    try {
      const wishlistRef = doc(db, "wishlists", user.uid);
      const wishlistSnapshot = await getDoc(wishlistRef);
      const wishlist = wishlistSnapshot.exists()
        ? wishlistSnapshot.data().items
        : [];
  
      // Prevent duplicate items
      if (!wishlist.find((item: any) => item.id === product.id)) {
        wishlist.push(product);
        await setDoc(wishlistRef, { items: wishlist });
        setAdded(true);
      } else {
        alert("Product already in wishlist!");
      }
    } catch (err) {
      console.error("Error adding to wishlist:", err);
    }
  };

  return (
    <Button_v2
      onClick={addToWishlist}
      className={`w-full sm:w-auto p-2 rounded ${added ? "bg-green-500" : "bg-gray-300"} text-white`}
    >
      {added ? "Added to Wishlist" : "Add to Wishlist"}
    </Button_v2>
  );
};

// ProductDetails Page Component
export default function ProductDetails({ params }: { params: { productId: string } }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Text-to-Speech Handler
  const handleVoiceOver = () => {
    if (product && "speechSynthesis" in window) {
      const synth = window.speechSynthesis;

      if (synth.speaking) synth.cancel();

      const speech = new SpeechSynthesisUtterance();
      speech.text = `
        Product details are as follows:
        Title: ${product.title}.
        Description: ${product.description}.
        Price: ${product.price} dollars.
        Shipping Information: ${product.shippingInformation}.
      `;
      speech.rate = 1;
      speech.pitch = 2;
      speech.volume = 1;

      synth.speak(speech);
    } else {
      alert("Sorry, your browser does not support voice-over functionality.");
    }
  };

  // Countdown Timer Renderer
  const renderTime = ({ remainingTime }: { remainingTime: number }) => (
    <div className="timer flex flex-col items-center  dark:text-black shadow-lg">
      {remainingTime === 0 ? (
        <div className="text-red-500 font-semibold dark:bg-gray-700 shadow-lg">Too late...</div>
      ) : (
        <>
          <div className="text">Remaining</div>
          <div className="value text-5xl font-bold">{remainingTime}</div>
          <div className="text">seconds</div>
        </>
      )}
    </div>
  );

  // Fetch Product Details
  useEffect(() => {
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

  if (loading) return <div className="mt-10"><SkeletonCard /></div>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  const productUrl = `https://final-year-project-cdv008-hehe.vercel.app/products/${params.productId}`;

  return (
    <div className="mx-auto max-w-screen-lg p-4 sm:p-8 shadow-lg">
      {product && (
        <div className="bg-white shadow-lg rounded-lg p-6 sm:p-10 font-mono">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full sm:w-1/2 lg:w-1/3 rounded-lg object-cover shadow-lg"
            />

            <div className="w-full sm:w-1/2 lg:w-2/3">
              <h1 className="text-2xl font-semibold mb-2">{product.title}</h1>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <p className="text-lg font-semibold text-green-500 mb-6">${product.price}</p>

              <div className="flex flex-col items-center mb-10">
                <p className="text-gray-600 mb-4 dark:text-black">
                  {product.shippingInformation} if ordered within:
                </p>
                <CountdownCircleTimer
                  isPlaying
                  duration={120}
                  colors={["#563A9C", "#8B5DFF", "#FAB12F", "#FF8000", "#FA4032", "#AF1740"]}
                  colorsTime={[120, 80, 40, 20, 10, 5]}
                >
                  {renderTime}
                </CountdownCircleTimer>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                <QRCodeSVG value={productUrl} size={120} />
                <p className="text-center">Scan to share this product!</p>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Button_v2
              onClick={handleVoiceOver}
              className="w-full sm:w-auto bg-purple-500 text-white shadow-lg"
            >
              Play Description
            </Button_v2>
            <WishlistButton product={product} />
            <Button_v2
              onClick={() => router.push("/product-list")}
              className="w-full sm:w-auto bg-green-500 text-white shadow-lg"
            >
              Back to Products
            </Button_v2>
          </div>
        </div>
      )}
    </div>
  );
}
