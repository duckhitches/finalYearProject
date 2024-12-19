// src/components/InstructionDrawer.tsx
'use client';

import { useRouter } from "next/navigation";
import * as React from "react";
import { QRCodeSVG } from "qrcode.react";
import { Button_v2 } from "../button/page";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

export function InstructionDrawer({ productId }: { productId: string }) {
  const [instructions, setInstructions] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);
  const router = useRouter();

  const fetchInstructions = React.useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const apiResponse = await fetch(`https://dummyjson.com/products/${productId}`);
      if (!apiResponse.ok) throw new Error("Failed to fetch product data.");
      const data = await apiResponse.json();
      setInstructions(data.description);
    } catch (err) {
      setError("Failed to fetch instructions.");
    } finally {
      setLoading(false);
    }
  }, [productId]);

  const productUrl = `http://localhost:3000/products/${productId}`;

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button_v2 className="font-mono">Get details</Button_v2>
      </DrawerTrigger>
      <DrawerContent className="mx-auto flex flex-col items-center w-full max-w-md sm:max-w-lg p-4 sm:p-6 dark:bg-slate-600 bg-red-400 rounded-md font-mono">
        <DrawerHeader>
          <DrawerTitle className="text-xl sm:text-2xl font-semibold text-center">Product Details</DrawerTitle>
        </DrawerHeader>

        <div className="p-4 w-full sm:w-auto">
          {loading ? (
            <p>Loading Details...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <p>{instructions ? instructions : "No Details available"}</p>
          )}
        </div>

        {/* QR Code Section */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center">
          <QRCodeSVG value={productUrl} size={120} />
          <p className="mt-4 sm:ml-4 sm:mt-0 text-center">Scan the QR code to view this product on your device.</p>
        </div>

        <DrawerFooter className="mt-6 w-full flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button_v2 onClick={fetchInstructions} className="w-full sm:w-auto">Tap to fetch details</Button_v2>
          <Button_v2 onClick={() => router.push(`/products/${productId}`)} className="w-full sm:w-auto bg-green-500 text-white">
            View Full Product Page
          </Button_v2>
          <DrawerClose asChild>
            <Button_v2 className="w-full sm:w-auto bg-red">Close</Button_v2>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
