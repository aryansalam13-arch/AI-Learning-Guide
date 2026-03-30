import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

export default function Card({ className, hover, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border bg-white p-6 shadow-sm",
        hover && "transition-shadow hover:shadow-md cursor-pointer",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
