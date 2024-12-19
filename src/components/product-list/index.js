'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";
import { SearchBar } from "@/components/ui/search-bar";
import Profile from "../profile";

import {
  Card,
  CardContent,
} from "@/components/ui/card";
import Link from "next/link";
import { TextFade } from "../welcome-page/page";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { InstructionDrawer } from "../drawer-demo/page";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerDescription
} from "@/components/ui/drawer";
import { Button_v2 } from "../button/page";

export default function ProductList({ productList }) {
  const [products, setProducts] = useState(productList);
  const router = useRouter();

  return (
    <div className="p-10 bg-inherit">
      <div>
        <div className="flex items-center justify-between p-4">
          <Button_v2
            onClick={() => router.push('/')}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Go Back
          </Button_v2>
          <h3><Profile/></h3>
        </div>

        <TextFade
          direction="up"
          className="pt-0 pb-5 flex-col flex justify-center items-center space-y-0"
        >
          <h2 className="text-xl text-center dark:text-black sm:text-4xl font-mono font-semibold tracking-tight md:text-4xl md:leading-[0rem] prose-h2:my-0 mt-20 mb-20">
            Types of Products Available
          </h2>
        </TextFade>

        {/* SearchBar */}
        <div>
          <div className="max-w-3xl mx-auto mb-4 dark:text-white">
            <SearchBar products={productList} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
            {products.map((product) => (
              <div
                key={product.id}
                className=""
                onClick={() => router.push(`/products/${product.id}`)}
              >
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
        {productList && productList.length > 0
          ? productList.map((product) => (
            <HoverCard key={product.id}>
              <HoverCardTrigger asChild>
                <div>
                  <Card>
                    <CardContent className="rounded-lg dark:bg-zinc-950 bg-zinc-50 overflow-hidden p-2 border pb-4 shadow-2xl cursor-pointer lg:hover:scale-[1.1] transition-all dark:text-slate-50">
                      <div className="w-full aspect-w-40 aspect-h-4 lg:h-15 relative">
                        <img
                          src={product.images}
                          alt={product.title}
                          className="object-cover object-top rounded-md shadow-2xl"
                        />
                      </div>

                      <h3 className="text-gray-800 font-bold font-mono text:size-lg mt-5 dark:text-slate-50">
                        {product.title}
                      </h3>

                      <div className="flex flex-wrap items-center mt-6 gap-2">
                        <p className="text-semi-bold font-serif gap-2 text-gray-800 dark:text-red-200">
                          Rating
                        </p>
                        <h3 className="text-yellow-600 font-sans text:size-md">
                          {product.rating}
                        </h3>
                      </div>

                      <div className="mt-5 mb-3 justify-center gap-1 flex flex-wrap items-center">
                        <Button_v2>Buy</Button_v2>

                        <InstructionDrawer productId={product.id}>
                          <Drawer>
                            <DrawerTrigger>
                              <Button_v2>Submit</Button_v2>
                            </DrawerTrigger>
                            <DrawerContent>
                              <DrawerHeader>
                                <DrawerTitle>Product Details</DrawerTitle>
                                <DrawerDescription>
                                </DrawerDescription>
                              </DrawerHeader>
                              <DrawerFooter>
                                <DrawerClose>
                                  <Button_v2>Cancel</Button_v2>
                                </DrawerClose>
                              </DrawerFooter>
                            </DrawerContent>
                          </Drawer>
                        </InstructionDrawer>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </HoverCardTrigger>

              <HoverCardContent>
                <p>SKU: {product.sku}</p>
                <p>Stock Remaining: {product.stock}</p>
              </HoverCardContent>
            </HoverCard>
          ))
          : null}
      </div>
    </div>
  );
}
