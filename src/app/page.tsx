'use client';

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button_v5 } from "@/components/button/page";
import { BlurIn } from "@/components/welcome-page/page";
import { IoSend } from "react-icons/io5";
import { GradualSpacing } from "@/components/welcome-page/page";
import { Carousel } from "@/components/ui/carousel"; // Import the Carousel component

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils"
import { TextFade } from "@/components/welcome-page/page";
import Login from "@/components/Login";
import { ModeToggle } from "@/components/toggle";

export default function Home() {
  const [productImages, setProductImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        const data = await response.json();
        const images = data.products.flatMap((product: any) => product.images);
        setProductImages(images.slice(0, 10));
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="vh-100 col-span-1 items-center justify-center space-y-8 bg-red-300 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <header className="flex items-center justify-between px-6 py-4 bg-background shadow-md dark:bg-gray-800">
        <GradualSpacing text="Welcome to Shopify" />
       
        <div className="items-end">
          <Login />
        </div>
        <div className="items-end shadow-lg border-l-background"><ModeToggle /></div>
      </header>

      <header className="flex flex-col items-center justify-content-center p-3 mt-2 mb-10 gap-6 dark:border-gray-700">
        <NavigationMenu className="font-mono">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="font-mono dark:bg-gray-700 shadow-lg">Getting started</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <li className="col-span-2 flex-col justify-center">
                    <NavigationMenuLink asChild>
                      <a
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md dark:from-gray-700"
                        href="/"
                      >
                        <div className="mb-2 mt-4 text-lg font-medium font-mono dark:text-gray-100">
                          shadcnUI/IndieUI
                        </div>
                        <p className="text-sm leading-relaxed text-muted-foreground dark:text-gray-300">
                          Beautifully designed components for a user-friendly
                          interface.
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <a
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md dark:from-gray-700"
                        href="https://github.com/duckhitches/finalYearProject"
                      >
                        <div className="mb-2 mt-4 text-lg font-medium dark:text-gray-100">
                          Implementation
                        </div>
                        <p className="text-sm leading-relaxed text-muted-foreground dark:text-gray-300">
                          Full step-by-step process available in my
                          <p className="font-bold">Github</p>
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="font-mono shadow-lg dark:bg-gray-700">Pages</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  <Link href="/">
                    <ListItem title="Home Page" className="dark:text-gray-300">
                      Introduction
                    </ListItem>
                  </Link>
                  <Link href="/product-list">
                    <ListItem title="Product Page" className="dark:text-gray-300">
                      Contains List of Products
                    </ListItem>
                  </Link>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link
                href="https://github.com/duckhitches/finalYearProject"
                legacyBehavior
                passHref
              >
                <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "font-mono shadow-lg dark:bg-gray-700")}>
                  Documentation
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </header>

      <main className="vh-70 text-dark dark:text-gray-100 gap-5">
        <div className="flex flex-col text-center font-mono text-lg">
          <TextFade direction="up" className="pt-0 pb-1 flex-col flex justify-center items-center space-y-0">
            <p className="p-10 text-lg dark:text-gray-300">
            Embark on a seamless shopping journey where innovation meets elegance. Our meticulously crafted e-commerce platform, powered by the synergy of DummyJSON, Shadcn, and IndieUI, brings you a dynamic shopping experience like no other. Explore a curated selection of products, each showcased with dynamic QR codes for instant information access and a text-to-speech feature for an immersive shopping experience. Immerse yourself in a minimalist design that prioritizes user experience, making your shopping journey effortless and enjoyable.
            </p>
          </TextFade>
          <Link href="/product-list">
            <div className="text-center">
              <BlurIn>
                <Button_v5
                  Icon={<IoSend />}
                  className="rounded-lg text-xl shadow-2xl font-mono group-hover:translate-x-0 bg-zinc-800 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-800"
                >
                  Explore Now
                </Button_v5>
              </BlurIn>
            </div>
          </Link>
        </div>
        {loading ? (
          <p className="text-center dark:text-gray-400">Loading products...</p>
        ) : (
          <div className="flex flex-col items-center">
            <Carousel
              images={productImages}
              className="m-30 p-10 dark:bg-gray-800"
            />
          </div>
        )}
      </main>

      <footer className="py-3 my-4 text-center bg-gray-200 dark:bg-gray-900 text-gray-700 dark:text-gray-400">
        <p>© 2024 Company, Inc</p>
      </footer>
    </div>
  );
}
const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => (
  <li>
    <NavigationMenuLink asChild>
      <a
        ref={ref}
        className={cn(
          "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
          className
        )}
        {...props}
      >
        <div className="text-sm font-medium leading-none">{title}</div>
        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
          {children}
        </p>
      </a>
    </NavigationMenuLink>
  </li>
));
ListItem.displayName = "ListItem";