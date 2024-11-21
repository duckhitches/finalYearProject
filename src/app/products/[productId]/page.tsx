'use client';

import * as React from "react";
import { useRouter } from "next/navigation";
import { QRCodeSVG } from "qrcode.react";
import { Button_v2 } from "@/components/button/page";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

import { SkeletonCard } from "@/components/skeletons/page";

type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  shippingInformation: string;
};

export default function ProductDetails({ params }: { params: { productId: string } }) {
  const [product, setProduct] = React.useState<Product | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);
  const router = useRouter();

  // Function to handle Text-to-Speech
  const handleVoiceOver = () => {
    if (product && 'speechSynthesis' in window) {
      const synth = window.speechSynthesis;
  
      // Cancel any ongoing speech
      if (synth.speaking) {
        synth.cancel();
      }
  
      // Create a new speech instance
      const speech = new SpeechSynthesisUtterance();
      speech.text = `
        Product details are as follows:
        Title: ${product.title}.
        Description: ${product.description}.
        Price: ${product.price} dollars.
        Shipping Information: ${product.shippingInformation}.
      `;
  
      speech.rate = 1; // Adjust speech rate (0.1 - 2)
      speech.pitch = 2; // Adjust speech pitch (0 - 2)
      speech.volume = 1; // Adjust volume (0 - 1)
  
      // Handle speech synthesis start and end events
      speech.onstart = () => {
        console.log("Speech synthesis started.");
      };
      speech.onend = () => {
        console.log("Speech synthesis finished.");
      };
      speech.onerror = (event) => {
        console.error("Speech synthesis error:", event);
      };
  
      // Play the speech
      synth.speak(speech);
    } else {
      alert('Sorry, your browser does not support voice-over functionality.');
    }
  };
  

  // Function for countdown timer
  function renderTime({ remainingTime }: { remainingTime: any }) {
    if (remainingTime === 0) {
      return <div className="timer font-mono font-bold">Too late...</div>;
    }

    return (
      <div className="timer flex flex-col items-center">
        <div className="text">Remaining</div>
        <div className="value font-bold text-5xl">{remainingTime}</div>
        <div className="text">seconds</div>
      </div>
    );
  }

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

  if (loading) return <div className="flex flex-col items-center mt-10"><SkeletonCard></SkeletonCard></div>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  // Product URL for QR code
  const productUrl = `http://localhost:3000/products/${params.productId}`;

  return (
    <div className="mx-auto max-w-screen-lg p-4 sm:p-8 shadow-lg">
      {product && (
        <div className="bg-white shadow-lg rounded-lg p-6 sm:p-10 font-mono">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            {/* Product Image */}
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full sm:w-1/2 lg:w-1/3 rounded-lg object-cover shadow-lg"
            />

            {/* Product Details */}
            <div className="w-full sm:w-1/2 lg:w-2/3 flex flex-col">
              <h1 className="text-2xl font-semibold mb-2 text-center sm:text-left">{product.title}</h1>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <p className="text-lg font-semibold text-green-500 mb-6">${product.price}</p>
              <div className="items-center flex flex-col mb-10">
                <p className="text-lg font-semibold text-gray-600 mb-6">
                  {product.shippingInformation} if ordered within
                </p>
                <div className="timer-wrapper font-mono items-center flex-col">
                  <CountdownCircleTimer
                    isPlaying
                    duration={120}
                    colors={["#563A9C", "#8B5DFF", "#FAB12F", "#FF8000", "#FA4032", "#AF1740"]}
                    colorsTime={[120, 80, 40, 20, 10, 5]}
                    onComplete={() => ({ shouldRepeat: false, delay: 1 })}
                  >
                    {renderTime}
                  </CountdownCircleTimer>
                </div>
              </div>

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
          <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 font-mono">
            <Button_v2
              onClick={handleVoiceOver} // Voice-Over Button
              className="w-full sm:w-auto bg-purple-500 text-white shadow-lg"
            >
              Play Description
            </Button_v2>
            <Button_v2 className="w-full sm:w-auto bg-blue-500 text-white shadow-lg">
              Add to Cart
            </Button_v2>
            <Button_v2
              className="w-full sm:w-auto bg-green-500 text-white shadow-lg"
              onClick={() => router.push('/product-list')}
            >
              Back to Products
            </Button_v2>
          </div>
        </div>
      )}
    </div>
  );
}
