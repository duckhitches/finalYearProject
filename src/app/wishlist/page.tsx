"use client"
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db, auth } from "@/lib/firebaseConfig";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button_v2 } from "@/components/button/page";

export default function Wishlist() {
  const [wishlist, setWishlist] = useState<any[]>([]);
  const user = auth.currentUser;
  const router = useRouter();

  useEffect(() => {
    const fetchWishlist = async () => {
      if (user) {
        const wishlistRef = doc(db, "wishlists", user.uid);
        const wishlistSnapshot = await getDoc(wishlistRef);
        if (wishlistSnapshot.exists()) {
          setWishlist(wishlistSnapshot.data().items || []);
        }
      }
    };

    fetchWishlist();
  }, [user]);

  const removeFromWishlist = async (productId: string) => {
    if (!user) return;

    try {
      const wishlistRef = doc(db, "wishlists", user.uid);
      const wishlistSnapshot = await getDoc(wishlistRef);

      if (wishlistSnapshot.exists()) {
        const items = wishlistSnapshot.data().items || [];
        const updatedWishlist = items.filter((item: any) => item.id !== productId);

        await updateDoc(wishlistRef, { items: updatedWishlist });
        setWishlist(updatedWishlist);
      }
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const shareWishlist = () => {
    if (navigator.share) {
      const url = `https://your-app.com/wishlist/${user?.uid}`;
      navigator.share({
        title: "My Wishlist",
        text: "Check out my wishlist!",
        url: url,
      });
    } else {
      alert(
        "Sharing not supported on your device. Copy this link instead: https://your-app.com/wishlist/" +
          user?.uid
      );
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto font-mono">
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <h2 className="text-3xl font-bold font-mono dark:text-black">Your Wishlist</h2>
        <Button_v2
          onClick={() => router.back()}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Go Back
        </Button_v2>
      </div>

      {/* Share Button */}
      <div className="mb-6 p-5 mt-5">
        <Button_v2
          onClick={shareWishlist}
          className="bg-transparent text-white px-6 py-2 rounded shadow-lg"
        >
          Share Wishlist
        </Button_v2>
      </div>

      {/* Wishlist Table */}
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-100 border-b  dark:text-black">
            <th className="text-left p-4">Product</th>
            <th className="text-left p-4">Price</th>
            <th className="text-left p-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {wishlist.length === 0 ? (
            <tr>
              <td colSpan={3} className="text-center p-6  dark:text-black font-bold">
                Your wishlist is empty.
              </td>
            </tr>
          ) : (
            wishlist.map((product) => (
              <tr key={product.id} className="border-b  dark:text-black">
                <td className="p-4">{product.title}</td>
                <td className="p-4">${product.price}</td>
                <td className="p-4">
                  <button
                    onClick={() => removeFromWishlist(product.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded  dark:text-black font-bold"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
