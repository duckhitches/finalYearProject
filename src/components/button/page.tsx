'use client';


import { cn } from '@/lib/utils';
import {
  Button,
  type ButtonProps as BaseButtonProps,
} from '@mui/base/Button';

 
type ButtonProps = {
  children: React.ReactNode,
} & BaseButtonProps;
 
//======================================


export const Button_v5 = ({
  children,
  Icon,
  ...rest
}: ButtonProps & { Icon: React.ReactNode }) => {
  return (
    <Button
      {...rest}
      className={cn(
        'relative overflow-hidden border shadow group',
        // light mode
        'border-zinc-300 text-zinc-800 bg-zinc-50',
        // dark mode
        'dark:border-zinc-700 dark:text-zinc-100 dark:bg-zinc-950',
        rest.className
      )}
    >
      <span className="absolute inset-0 rounded-sm flex items-center justify-center size-full duration-[600ms] ease-[cubic-bezier(0.50,0.20,0,1)]  -translate-x-full group-hover:translate-x-0 bg-zinc-800 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-800">
        {Icon}
      </span>
      <span className="absolute flex items-center justify-center w-full h-full transition-all duration-500 ease transform group-hover:translate-x-full ">
        {children}
      </span>
      <span className="relative invisible">{children}</span>
    </Button>
  );
};
// =======================================================

export const Button_v2 = ({ children, ...rest }: ButtonProps) => {
  return (
    <Button
      {...rest}
      className={cn(
        'group relative rounded-md p-4 overflow-hidden ease-in-out hover:scale-105 hover:shadow-lg',
        // light mode
        'text-zinc-50 bg-gradient-to-tr from-zinc-900 to-zinc-700 hover:shadow-zinc-500/30',
        // dark mode
        'dark:text-zinc-900 dark:bg-gradient-to-tr dark:from-zinc-50 dark:to-zinc-100 dark:hover:shadow-zinc-700/30',
        rest.className
      )}
    >
      <span>{children}</span>
      <span className="absolute inset-0 rounded-md flex size-full justify-center [transform:skew(-14deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-14deg)_translateX(100%)]">
        <span className="relative h-full w-8 bg-white/20 dark:bg-black/10" />
      </span>
    </Button>
  );
};