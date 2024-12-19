'use client';

import { cn } from '@/lib/utils';
import { IoSend } from 'react-icons/io5';
import React from 'react';
import {
  Button,
  type ButtonProps as BaseButtonProps,
} from '@/components/ui/button';
type ButtonProps = {
  children: React.ReactNode;
} & BaseButtonProps;
 
//======================================
export const Button_v5 = ({
  children,
  Icon = <IoSend size="20" />,
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
        rest.className,
      )}
    >
      <span className="absolute inset-0 rounded-sm flex items-center justify-center size-full duration-700 ease-[cubic-bezier(0.50,0.20,0,1)] -translate-x-full group-hover:translate-x-0 bg-zinc-800 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-800">
        {Icon}
      </span>
      <span className="absolute flex items-center justify-center w-full h-full transition-all duration-500 ease-out transform group-hover:translate-x-full ">
        {children}
      </span>
      <span className="relative invisible">{children}</span>
    </Button>
  );
};
Button_v5.displayName = 'Button_v5';
// =======================================================

export const Button_v2 = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, ...rest }, ref) => {
    return (
      <Button
        {...rest}
        ref={ref} // Forwarding ref here
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
  }
);

// ==============================================

export const EyeCatchingButton_v1 = ({ ...props }: ButtonProps) => {
  return (
    <div className="relative overflow-hidden rounded-full dark:bg-zinc-900 bg-white shadow border dark:border-zinc-800 group border-zinc-400 p-0.5">
      <span className="absolute inset-[-1000%] animate-[spin_5s_linear_infinite_reverse] dark:bg-[conic-gradient(from_90deg_at_50%_50%,#fff_0%,#09090B_7%)] bg-[conic-gradient(from_90deg_at_50%_50%,#000_0%,#fff_5%)] group-hover:bg-none" />
      <Button
        {...props}
        className={cn(
          'h-10 px-8 w-full rounded-full font-semibold text-zinc-800 dark:text-zinc-200 backdrop-blur-xl bg-zinc-50 dark:bg-zinc-900',
          props.className
        )}
      />
    </div>
  );
};