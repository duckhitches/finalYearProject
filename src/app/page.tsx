'use client';

import { Button_v5 } from "@/components/button/page";
import { BlurIn, GradualSpacing } from "@/components/welcome-page/page";
import { IoSend } from "react-icons/io5";

import Link from "next/link";



export default function Home() {
  // const router = useRouter();
  // // const [isMounted, setIsMounted] = useState(false);

  // // // Ensure component is mounted before accessing router
  // // useEffect(() => {
  // //   setIsMounted(true); // This ensures the router is available after the component mounts
  // // }, []);

  // const handleClick = () => {
  //   if (router) {
  //     router.push('/recipe-list');
  //   }
  // };

  return (
    //rishi create a homepage here.
    <div className="flex flex-col  col-span-1 items-center justify-center space-y-8">
      <GradualSpacing text="Welcome to my BP1 Website" />
      <Link href='/product-list'>
      <div>
      <BlurIn>  
        <Button_v5 
          Icon={<IoSend />}
          className="mt-100 rounded-lg p-2 flex flex-wrap text-center font-mono text-lg shadow-2xl items-center justify-center group-hover:translate-x-0 bg-zinc-800 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-800"
          // onClick={handleClick}
        >
          Explore products
        </Button_v5> 
      </BlurIn>

      </div>
     
      </Link>
     
    </div>
  );
}
