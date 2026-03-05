import React from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function MaxWidthContainer({ className, children }) {
  return (
    <div className={cn("mx-auto max-w-screen-xl px-2.5 md:px-20", className)}>
      {children}
    </div>
  );
}

export function GridContainer({ className, children }) {
  return (
    <div className={cn("grid grid-cols-1 gap-4", className)}>
      {children}
    </div>
  );
}
