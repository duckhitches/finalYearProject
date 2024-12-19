"use client";
import { signInWithGoogle, logout, auth } from "@/lib/firebaseConfig";
import { useState, useEffect } from "react";
import { Button_v2 } from "./button/page";

export default function Login() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="p-4">
      {user ? (
        <div>
          <img src={user.photoURL} alt="profile" className="w-12 h-12 rounded-full" />
          <h2 className="font-mono">Welcome, {user.displayName}</h2>
          <Button_v2
            onClick={logout}
            className="mt-2 bg-red-500 text-white p-2 rounded"
          >
            Logout
          </Button_v2>
        </div>
      ) : (
        <Button_v2
          onClick={signInWithGoogle}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Sign In with Google
        </Button_v2>
      )}
    </div>
  );
}
