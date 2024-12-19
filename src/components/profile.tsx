"use client";
import { doc, getDoc } from "firebase/firestore";
import { db, auth, logout } from "@/lib/firebaseConfig";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";

export default function Profile() {
  const [wishlist, setWishlist] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const user = auth.currentUser;
  const router = useRouter();

  useEffect(() => {
    const fetchWishlist = async () => {
      if (!user) {
        console.error("User is not logged in.");
        return;
      }

      try {
        const wishlistRef = doc(db, "wishlists", user.uid);
        const wishlistSnapshot = await getDoc(wishlistRef);
        if (wishlistSnapshot.exists()) {
          setWishlist(wishlistSnapshot.data().items || []);
        } else {
          setWishlist([]);
        }
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, [user]);

  const userPhoto = user?.photoURL?.startsWith("http")
    ? user.photoURL
    : "/default-avatar.png";
  const userName = user?.displayName || "Anonymous User";

  return (
    <div className="p-4 dark:text-black">
      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <img
              src={userPhoto}
              alt="Profile"
              className="w-12 h-12 rounded-full object-cover cursor-pointer"
              onError={(e) => (e.currentTarget.src = "/default-avatar.png")}
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => router.push("/wishlist")} className="font-mono text-lg">
              Wishlist
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push("/")} className="font-mono text-lg">
              Home
            </DropdownMenuItem>
            <DropdownMenuItem onClick={logout} className="text-red-500 font-mono text-lg font-bold bg-orange-300">
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <h3 className="text-3xl font-semibold font-mono">{userName}</h3>
      </div>

      <div className="mt-6 dark:text-black">
        {loading ? (
          <p>Loading wishlist...</p>
        ) : wishlist.length > 0 ? (
          <ul className="space-y-2">
            {wishlist.map((product) => (
              <li key={product.id} className="p-2 flex justify-between">
                <span>{product.title}</span>
                <span className="text-gray-600">${product.price}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">Your wishlist is empty.</p>
        )}
      </div>
    </div>
  );
}
